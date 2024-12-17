const { User, Charity, OTPCode } = require("../../models");
const { Vonage } = require('@vonage/server-sdk');
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET
});

// Thêm hàm helper để format số điện thoại
const formatPhoneNumber = (phone) => {
  // Chuyển đổi 84xxxxxxxxx thành 0xxxxxxxxx
  if (phone.startsWith('84')) {
    return '0' + phone.slice(2);
  }
  return phone;
};

// Gửi OTP
exports.sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;
    console.log('Sending OTP to:', phone);

    // Format phone number to international format
    let internationalPhone = phone;
    if (phone.startsWith('0')) {
      internationalPhone = '84' + phone.slice(1);
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Generated OTP:', otp);

    try {
      // Send OTP via Vonage with modified configuration
      const vonageResponse = await vonage.sms.send({
        to: internationalPhone,
        from: "GIVEBACK", // Đăng ký brandname này với Vonage
        text: `Ma OTP cua ban la: ${otp}. Ma co hieu luc trong 5 phut.`,
        type: "unicode"
      });
      console.log('Vonage response:', vonageResponse);

      // Save OTP to database even if SMS fails
      await OTPCode.create({
        id: uuidv4(),
        phone: formatPhoneNumber(phone),
        code: otp,
        expiresAt: new Date(Date.now() + 5 * 60000),
        verified: false,
        attemptCount: 0
      });

      // For development, log the OTP
      if (process.env.NODE_ENV === 'development') {
        console.log('Development OTP:', otp);
      }

      res.status(200).json({
        success: true,
        message: "Đã gửi mã OTP",
        devOtp: process.env.NODE_ENV === 'development' ? otp : undefined
      });

    } catch (vonageError) {
      console.error('Vonage error:', vonageError);
      // Still create OTP in database for development
      if (process.env.NODE_ENV === 'development') {
        await OTPCode.create({
          id: uuidv4(),
          phone: formatPhoneNumber(phone),
          code: otp,
          expiresAt: new Date(Date.now() + 5 * 60000),
          verified: false,
          attemptCount: 0
        });
        return res.status(200).json({
          success: true,
          message: "Đã tạo mã OTP (development mode)",
          devOtp: otp
        });
      }
      throw vonageError;
    }

  } catch (error) {
    console.error("Detailed send OTP error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi gửi OTP",
      error: error.message
    });
  }
};

// Xác thực OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { phone, code } = req.body;

    const otpRecord = await OTPCode.findOne({
      where: {
        phone,
        verified: false
      },
      order: [['created_at', 'DESC']]
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Không tìm thấy mã OTP"
      });
    }

    // Check expiration
    if (new Date() > otpRecord.expiresAt) {
      return res.status(400).json({
        success: false,
        message: "Mã OTP đã hết hạn"
      });
    }

    // Increment attempt count
    otpRecord.attemptCount += 1;
    await otpRecord.save();

    // Verify code or bypass after 4 attempts
    if (otpRecord.code !== code) {
      if (otpRecord.attemptCount >= 4) {
        otpRecord.verified = true;
        await otpRecord.save();
        return res.status(200).json({
          success: true,
          message: "Xác thực OTP thành công (bypass)",
          bypassOTP: true
        });
      }
      return res.status(400).json({
        success: false,
        message: `Mã OTP không đúng. Còn ${4 - otpRecord.attemptCount} lần thử`
      });
    }

    // Mark as verified
    otpRecord.verified = true;
    await otpRecord.save();

    res.status(200).json({
      success: true,
      message: "Xác thực OTP thành công"
    });

  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi xác thực OTP",
      error: error.message
    });
  }
};

// Đăng ký tài khoản
exports.register = async (req, res) => {
  try {
    const {
      email,
      password,
      phone,
      fullName,
      role,
      province,
      district,
      ward,
      address,
      // Charity fields
      title,
      description,
      licenseNumber,
      licenseDate,
      licenseIssuer,
      licenseImageUrl
    } = req.body;

    // Validate required fields
    if (!email || !password || !phone || !fullName || !role) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thông tin bắt buộc"
      });
    }

    // Check if email exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email đã được sử dụng"
      });
    }

    // Check OTP verification
    const latestOTP = await OTPCode.findOne({
      where: { phone },
      order: [['created_at', 'DESC']]
    });

    const shouldBypassOTP = latestOTP && latestOTP.attemptCount >= 4;
    if (!shouldBypassOTP && (!latestOTP || !latestOTP.verified)) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng xác thực số điện thoại"
      });
    }

    // Format phone number before saving
    const formattedPhone = formatPhoneNumber(phone);

    // Create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    const user = await User.create({
      id: userId,
      fullName,
      email,
      phone: formattedPhone,
      password: hashedPassword,
      role,
      province,
      district,
      ward,
      address,
      otpVerified: true,
      phoneVerifiedAt: new Date()
    });

    // Create charity if role is CHARITY
    if (role === 'CHARITY') {
      if (!title || !licenseNumber || !licenseDate || !licenseIssuer || !licenseImageUrl) {
        await user.destroy();
        return res.status(400).json({
          success: false,
          message: "Thiếu thông tin tổ chức từ thiện"
        });
      }

      await Charity.create({
        id: userId,
        title,
        description,
        licenseNumber,
        licenseDate,
        licenseIssuer,
        licenseImageUrl,
        verificationStatus: 'PENDING'
      });
    }

    res.status(201).json({
      success: true,
      message: "Đăng ký thành công",
      data: {
        userId,
        email,
        role
      }
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi đăng ký",
      error: error.message
    });
  }
}; 