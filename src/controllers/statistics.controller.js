const { sequelize } = require('../models');
const { Charity, Campaign, User, Distribution, Donation } = require('../models');

class StatisticsController {
  async getSystemOverview(req, res) {
    try {
      console.log('Getting system overview...');

      // Đếm tổng số tổ chức từ thiện
      const totalCharities = await Charity.count();

      // Đếm tổng số chiến dịch
      const totalCampaigns = await Campaign.count();

      // Tính tổng số tiền quyên góp và số người đóng góp
      const donationStats = await Donation.findOne({
        attributes: [
          [sequelize.fn('COALESCE', sequelize.fn('SUM', sequelize.col('amount')), 0), 'total_donated'],
          [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('donor_id'))), 'total_donors']
        ],
        where: {
          status: 'SUCCESS' // Thay đổi từ COMPLETED thành SUCCESS theo đúng enum trong model
        },
        raw: true
      });

      // Tính tổng số tiền cứu trợ và số người nhận
      const reliefStats = await Distribution.findOne({
        attributes: [
          [sequelize.fn('COALESCE', sequelize.fn('SUM', sequelize.col('budget')), 0), 'total_relief'],
          [sequelize.fn('COALESCE', sequelize.fn('SUM', sequelize.col('beneficiary_count')), 0), 'total_beneficiaries']
        ],
        raw: true
      });

      const results = {
        total_charities: totalCharities,
        total_campaigns: totalCampaigns,
        total_donated: Number(donationStats?.total_donated || 0),
        total_donors: Number(donationStats?.total_donors || 0),
        total_relief: Number(reliefStats?.total_relief || 0),
        total_beneficiaries: Number(reliefStats?.total_beneficiaries || 0)
      };

      console.log('Results:', results);

      return res.json({
        success: true,
        data: results
      });
    } catch (error) {
      console.error('Error getting system overview:', error);
      return res.status(500).json({
        success: false,
        error: 'Lỗi khi lấy thống kê hệ thống'
      });
    }
  }
}

module.exports = new StatisticsController(); 