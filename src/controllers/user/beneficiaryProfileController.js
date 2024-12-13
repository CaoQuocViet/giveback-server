const { User } = require("../../models");
const { sequelize } = require("../../models");
const { uploadFile } = require("../../utils/fileUpload");

exports.getBeneficiaryProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    
    const beneficiary = await User.findOne({
      where: { 
        id: userId,
        role: 'BENEFICIARY'
      },
      attributes: {
        exclude: ['password', 'otpVerified']
      }
    });

    if (!beneficiary) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy thông tin người thụ hưởng"
      });
    }

    // Format image URL
    const responseData = beneficiary.toJSON();
    if (responseData.profileImage) {
      responseData.profileImage = `${baseUrl}/storage/${responseData.profileImage}`;
    }

    return res.status(200).json({
      success: true,
      data: responseData
    });
  } catch (error) {
    console.error("Get beneficiary profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Đã có lỗi xảy ra",
      error: error.message
    });
  }
};

exports.updateBeneficiaryProfile = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const userId = req.user.id;
    const updateData = req.body;
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    // Lấy thông tin user hiện tại để có đường dẫn ảnh cũ
    const currentUser = await User.findByPk(userId);
    
    // Xử lý upload ảnh nếu có
    if (req.file) {
      const profileImagePath = await uploadFile(
        req.file, 
        'profiles',
        currentUser.profileImage
      );
      updateData.profileImage = profileImagePath;
    }

    // Các trường được phép cập nhật cho BENEFICIARY
    const allowedFields = [
      'fullName',
      'profileImage',
      'province',
      'district',
      'ward',
      'address'
    ];

    const filteredData = Object.keys(updateData)
      .filter(key => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = updateData[key];
        return obj;
      }, {});

    await User.update(filteredData, {
      where: { 
        id: userId,
        role: 'BENEFICIARY'
      },
      transaction: t
    });

    await t.commit();

    const updatedBeneficiary = await User.findByPk(userId, {
      attributes: {
        exclude: ['password', 'otpVerified']
      }
    });

    // Format image URL
    const responseData = updatedBeneficiary.toJSON();
    if (responseData.profileImage) {
      responseData.profileImage = `${baseUrl}/storage/${responseData.profileImage}`;
    }

    return res.status(200).json({
      success: true,
      message: "Cập nhật thông tin thành công",
      data: responseData
    });

  } catch (error) {
    await t.rollback();
    console.error("Update beneficiary profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Đã có lỗi xảy ra",
      error: error.message
    });
  }
}; 