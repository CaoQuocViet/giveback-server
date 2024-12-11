const { User } = require("../../models");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const user = await User.findByPk(userId, {
      attributes: { 
        exclude: ['password'] 
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng"
      });
    }

    return res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Đã có lỗi xảy ra khi lấy thông tin profile",
      error: error.message
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updateData = req.body;

    // Không cho phép cập nhật một số trường nhạy cảm
    delete updateData.password;
    delete updateData.email;
    delete updateData.phone;
    delete updateData.role;
    delete updateData.otp_verified;

    const [updated] = await User.update(updateData, {
      where: { id: userId }
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng"
      });
    }

    // Lấy thông tin user sau khi update
    const user = await User.findByPk(userId, {
      attributes: { 
        exclude: ['password'] 
      }
    });

    return res.status(200).json({
      success: true,
      message: "Cập nhật thông tin thành công",
      data: user
    });

  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Đã có lỗi xảy ra khi cập nhật profile",
      error: error.message
    });
  }
}; 