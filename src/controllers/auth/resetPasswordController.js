const { User, PasswordReset } = require('../../models');
const { generateToken, hashPassword } = require('../../utils/auth');
const { sendResetPasswordEmail } = require('../../utils/email');
const { Op } = require('sequelize');

exports.requestPasswordReset = async (req, res) => {
  try {
    const { identifier } = req.body; // email hoặc phone
    
    // Tìm user dựa trên email hoặc phone
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: identifier },
          { phone: identifier }
        ]
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy tài khoản với thông tin này"
      });
    }

    // Tạo token và lưu vào bảng PasswordReset
    const token = generateToken(6); // Tạo mã 6 chữ số
    await PasswordReset.create({
      userId: user.id,
      token: token,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 phút
      used: false
    });

    // Gửi email chứa token
    await sendResetPasswordEmail(user.email, token);

    return res.json({
      success: true,
      message: "Mã xác thực đã được gửi đến email của bạn"
    });
  } catch (error) {
    console.error("Request password reset error:", error);
    return res.status(500).json({
      success: false,
      message: "Đã có lỗi xảy ra khi yêu cầu khôi phục mật khẩu"
    });
  }
};

exports.verifyResetToken = async (req, res) => {
  try {
    const { identifier, token } = req.body;

    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: identifier },
          { phone: identifier }
        ]
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy tài khoản"
      });
    }

    const validReset = await PasswordReset.findOne({
      where: {
        userId: user.id,
        token: token,
        used: false,
        expiresAt: {
          [Op.gt]: new Date()
        }
      }
    });

    if (!validReset) {
      return res.status(400).json({
        success: false,
        message: "Mã xác thực không hợp lệ hoặc đã hết hạn"
      });
    }

    return res.json({
      success: true,
      message: "Xác thực thành công"
    });
  } catch (error) {
    console.error("Verify reset token error:", error);
    return res.status(500).json({
      success: false,
      message: "Đã có lỗi xảy ra khi xác thực mã"
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { identifier, token, newPassword } = req.body;

    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: identifier },
          { phone: identifier }
        ]
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy tài khoản"
      });
    }

    const validReset = await PasswordReset.findOne({
      where: {
        userId: user.id,
        token: token,
        used: false,
        expiresAt: {
          [Op.gt]: new Date()
        }
      }
    });

    if (!validReset) {
      return res.status(400).json({
        success: false,
        message: "Mã xác thực không hợp lệ hoặc đã hết hạn"
      });
    }

    // Cập nhật mật khẩu mới
    const hashedPassword = await hashPassword(newPassword);
    await user.update({ password: hashedPassword });
    
    // Đánh dấu token đã được sử dụng
    await validReset.update({ used: true });

    return res.json({
      success: true,
      message: "Đặt lại mật khẩu thành công"
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({
      success: false,
      message: "Đã có lỗi xảy ra khi đặt lại mật khẩu"
    });
  }
}; 