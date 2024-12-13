const { User, Charity } = require("../../models");
const { sequelize } = require("../../models");
const { uploadFile } = require("../../utils/fileUpload");

module.exports = {
  getCharityProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const baseUrl = `${req.protocol}://${req.get('host')}`;

      const charity = await User.findOne({
        where: { 
          id: userId,
          role: 'CHARITY'
        },
        include: [{
          model: Charity,
          as: 'charity',
          attributes: {
            exclude: ['apiKey']
          }
        }],
        attributes: {
          exclude: ['password', 'otpVerified']
        }
      });

      if (!charity) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy thông tin tổ chức"
        });
      }

      // Format image URLs
      const charityData = charity.toJSON();
      if (charityData.profileImage) {
        charityData.profileImage = `${baseUrl}/storage/${charityData.profileImage}`;
      }
      if (charityData.charity?.licenseImageUrl) {
        charityData.charity.licenseImageUrl = `${baseUrl}/storage/${charityData.charity.licenseImageUrl}`;
      }

      return res.status(200).json({
        success: true,
        data: charityData
      });
    } catch (error) {
      console.error("Get charity profile error:", error);
      return res.status(500).json({
        success: false,
        message: "Đã có lỗi xảy ra",
        error: error.message
      });
    }
  },

  updateCharityProfile: async (req, res) => {
    const t = await sequelize.transaction();

    try {
      const userId = req.user.id;
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      
      // Khởi tạo objects để update
      let userInfo = req.body.userInfo || {};
      let charityInfo = req.body.charityInfo || {};
      
      // Xử lý upload ảnh profile nếu có
      if (req.files?.profileImage) {
        const profileImagePath = await uploadFile(req.files.profileImage[0], 'profiles');
        userInfo = {
          ...userInfo,
          profileImage: profileImagePath
        };
      }

      // Xử lý upload ảnh giấy phép nếu có
      if (req.files?.licenseImage) {
        const licenseImagePath = await uploadFile(req.files.licenseImage[0], 'licenses');
        charityInfo = {
          ...charityInfo,
          licenseImageUrl: licenseImagePath
        };
      }

      // Cập nhật thông tin User
      if (Object.keys(userInfo).length > 0) {
        await User.update(userInfo, {
          where: { id: userId },
          transaction: t
        });
      }

      // Cập nhật thông tin Charity
      if (Object.keys(charityInfo).length > 0) {
        await Charity.update(charityInfo, {
          where: { id: userId },
          transaction: t
        });
      }

      // Lấy thông tin đã cập nhật
      const updatedCharity = await User.findOne({
        where: { id: userId },
        include: [{
          model: Charity,
          as: 'charity',
          attributes: {
            exclude: ['apiKey']
          }
        }],
        attributes: {
          exclude: ['password', 'otpVerified']
        },
        transaction: t
      });

      if (!updatedCharity) {
        await t.rollback();
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy thông tin tổ chức"
        });
      }

      // Format image URLs
      const charityData = updatedCharity.toJSON();
      if (charityData.profileImage) {
        charityData.profileImage = `${baseUrl}/storage/${charityData.profileImage}`;
      }
      if (charityData.charity?.licenseImageUrl) {
        charityData.charity.licenseImageUrl = `${baseUrl}/storage/${charityData.charity.licenseImageUrl}`;
      }

      await t.commit();
      
      return res.status(200).json({
        success: true,
        message: "Cập nhật thông tin thành công",
        data: charityData
      });

    } catch (error) {
      // Chỉ rollback khi transaction chưa được commit
      if (!t.finished) {
        await t.rollback();
      }
      
      console.error("Update charity profile error:", error);
      return res.status(500).json({
        success: false,
        message: "Đã có lỗi xảy ra",
        error: error.message
      });
    }
  }
}; 