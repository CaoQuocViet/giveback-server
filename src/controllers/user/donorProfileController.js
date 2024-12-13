const { User, sequelize } = require("../../models");
const { uploadFile } = require("../../utils/fileUpload");

exports.getDonorProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    
    const donor = await User.findOne({
      where: { 
        id: userId,
        role: 'DONOR'
      },
      attributes: {
        exclude: ['password', 'otpVerified']
      }
    });

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy thông tin người dùng"
      });
    }

    // Tính toán thống kê đóng góp
    const donationStats = await sequelize.query(`
      SELECT 
        COUNT(DISTINCT campaign_id) as campaign_count,
        COALESCE(SUM(amount), 0) as total_donated
      FROM "Donations"
      WHERE donor_id = :donorId
      AND status = 'SUCCESS'
      GROUP BY donor_id
    `, {
      replacements: { donorId: userId },
      type: sequelize.QueryTypes.SELECT
    });

    const responseData = donor.toJSON();
    if (responseData.profileImage) {
      responseData.profileImage = `${baseUrl}/storage/${responseData.profileImage}`;
    }

    return res.status(200).json({
      success: true,
      data: {
        ...responseData,
        donationStats: {
          campaignCount: donationStats[0]?.campaign_count || 0,
          totalDonated: donationStats[0]?.total_donated || 0
        }
      }
    });
  } catch (error) {
    console.error("Get donor profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Đã có lỗi xảy ra",
      error: error.message
    });
  }
};

exports.updateDonorProfile = async (req, res) => {
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
        currentUser.profileImage // Truyền đường dẫn ảnh cũ để xóa
      );
      updateData.profileImage = profileImagePath;
    }

    // Các trường được phép cập nhật cho DONOR
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
        role: 'DONOR'
      },
      transaction: t
    });

    await t.commit();

    // Lấy thông tin đã cập nhật kèm theo donationStats
    const donationStats = await sequelize.query(`
      SELECT 
        COUNT(DISTINCT campaign_id) as campaign_count,
        COALESCE(SUM(amount), 0) as total_donated
      FROM "Donations"
      WHERE donor_id = :donorId
      AND status = 'SUCCESS'
      GROUP BY donor_id
    `, {
      replacements: { donorId: userId },
      type: sequelize.QueryTypes.SELECT
    });

    const updatedDonor = await User.findByPk(userId, {
      attributes: {
        exclude: ['password', 'otpVerified']
      }
    });

    const responseData = updatedDonor.toJSON();
    if (responseData.profileImage) {
      responseData.profileImage = `${baseUrl}/storage/${responseData.profileImage}`;
    }

    return res.status(200).json({
      success: true,
      message: "Cập nhật thông tin thành công",
      data: {
        ...responseData,
        donationStats: {
          campaignCount: donationStats[0]?.campaign_count || 0,
          totalDonated: donationStats[0]?.total_donated || 0
        }
      }
    });

  } catch (error) {
    await t.rollback();
    console.error("Update donor profile error:", error);
    return res.status(500).json({
      success: false, 
      message: "Đã có lỗi xảy ra",
      error: error.message
    });
  }
}; 