const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

exports.register = async (req, res) => {
  try {
    const { email, password, phoneNumber, hoTen } = req.body;

    // Kiểm tra email đã tồn tại
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email đã được sử dụng" });
    }

    // Tạo user mới
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      id: uuidv4(),
      full_name: hoTen,
      email,
      phone: phoneNumber,
      password: hashedPassword,
      role: 'DONOR',
      otp_verified: false
    });

    return res.status(201).json({ 
      success: true, 
      message: "Đăng ký thành công. Vui lòng xác thực OTP",
      data: {
        user_id: user.id,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ 
      success: false,
      message: "Đăng ký thất bại",
      error: error.message 
    });
  }
}; 