const { Distribution, Campaign, User, sequelize } = require('../../models');
const { uploadFile } = require('../../utils/fileUpload');
const path = require('path');

class DistributionController {
  // Lấy danh sách chiến dịch có thể tạo khoản cứu trợ
  async getAvailableCampaigns(req, res) {
    try {
      const charityId = req.user.id;
      console.log('CharityId:', charityId);

      // Sử dụng subquery với GROUP BY để tính tổng phân phối cho mỗi chiến dịch
      const campaigns = await Campaign.findAll({
        where: {
          charity_id: charityId,
          status: 'ONGOING'
        },
        attributes: [
          'id', 
          'title',
          'current_amount',
          [
            sequelize.literal(`(
              SELECT COALESCE(SUM(d.budget), 0)
              FROM "Distributions" d 
              WHERE d.campaign_id = "Campaign".id
              GROUP BY d.campaign_id
            )`),
            'total_distributed'
          ]
        ],
        raw: true
      });

      console.log('Raw campaigns data:', campaigns);

      // Tính toán số tiền còn lại và format dữ liệu
      const availableCampaigns = campaigns
        .map(campaign => ({
          id: campaign.id,
          title: campaign.title,
          currentAmount: Number(campaign.current_amount || 0),
          totalDistributed: Number(campaign.total_distributed || 0),
          remainingAmount: Number(campaign.current_amount || 0) - Number(campaign.total_distributed || 0)
        }))
        .filter(campaign => campaign.remainingAmount > 0);

      console.log('Available campaigns:', availableCampaigns);

      return res.json({
        success: true,
        data: availableCampaigns
      });

    } catch (error) {
      console.error('Detailed error:', error);
      return res.status(500).json({
        success: false,
        message: 'Đã có lỗi xảy ra khi lấy danh sách chiến dịch',
        error: error.message
      });
    }
  }

  // Tạo khoản cứu trợ mới
  async createDistribution(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const charityId = req.user.id;
      
      // Validate input
      const {
        campaignId,
        title,
        budget,
        distributionDate,
        province,
        district,
        ward,
        address,
        beneficiaryCount,
        description,
        reliefDate
      } = req.body;

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng tải lên ảnh chứng minh'
        });
      }

      // Kiểm tra chiến dịch và số tiền còn lại
      const campaign = await Campaign.findOne({
        where: { 
          id: campaignId,
          charity_id: charityId
        },
        attributes: [
          'id',
          'current_amount',
          [
            sequelize.literal(`(
              SELECT COALESCE(SUM(budget), 0) 
              FROM "Distributions" 
              WHERE campaign_id = "Campaign".id
            )`),
            'total_distributed'
          ]
        ],
        group: ['Campaign.id'],
        transaction
      });

      if (!campaign) {
        await transaction.rollback();
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy chiến dịch'
        });
      }

      const remainingAmount = campaign.current_amount - campaign.getDataValue('total_distributed');
      
      if (budget > remainingAmount) {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          message: 'Số tiền cứu trợ vượt quá số tiền còn lại của chiến dịch'
        });
      }

      // Upload ảnh
      const proofImagePath = await uploadFile(req.file, 'distributions');

      // Lấy thông tin người đại diện
      const charity = await User.findByPk(charityId, {
        attributes: ['full_name'],
        transaction
      });

      // Tạo khoản cứu trợ
      const distribution = await Distribution.create({
        campaignId,
        title,
        budget,
        distributionDate,
        province,
        district,
        ward,
        address,
        beneficiaryCount,
        description,
        proofImages: proofImagePath,
        representativeName: charityId, // Lưu ID người đại diện
        reliefDate
      }, { transaction });

      await transaction.commit();

      return res.status(201).json({
        success: true,
        message: 'Tạo khoản cứu trợ thành công',
        data: {
          ...distribution.toJSON(),
          representativeFullName: charity.full_name
        }
      });

    } catch (error) {
      await transaction.rollback();
      console.error('Error creating distribution:', error);
      return res.status(500).json({
        success: false,
        message: 'Đã có lỗi xảy ra khi tạo khoản cứu trợ',
        error: error.message
      });
    }
  }
}

module.exports = new DistributionController(); 