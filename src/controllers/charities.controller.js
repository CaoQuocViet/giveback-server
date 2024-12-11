const { Op } = require('sequelize');
const { Charity, User, Campaign, Donation } = require('../models');

class CharitiesController {
  async listCharities(req, res) {
    try {
      const {
        search,
        verification_status,
        min_rating,
        page = 1,
        limit = 10
      } = req.query;

      // Xây dựng query conditions
      const whereConditions = {};
      const userWhereConditions = {};

      // Tìm kiếm theo tên
      if (search) {
        userWhereConditions.full_name = {
          [Op.iLike]: `%${search}%`
        };
      }

      // Lọc theo trạng thái xác minh
      if (verification_status) {
        whereConditions.verification_status = verification_status;
      }

      // Lọc theo đánh giá
      if (min_rating) {
        whereConditions.rating = {
          [Op.gte]: parseFloat(min_rating)
        };
      }

      // Thực hiện query với joins và aggregates
      const { rows: charities, count } = await Charity.findAndCountAll({
        where: whereConditions,
        include: [
          {
            model: User,
            as: 'user',
            where: userWhereConditions,
            attributes: ['full_name', 'profile_image']
          }
        ],
        attributes: [
          'id',
          'title',
          'description',
          'rating',
          'campaign_count',
          'total_raised',
          'verification_status'
        ],
        offset: (page - 1) * limit,
        limit: parseInt(limit),
        order: [['rating', 'DESC']]
      });

      return res.json({
        success: true,
        data: {
          charities,
          pagination: {
            total: count,
            page: parseInt(page),
            total_pages: Math.ceil(count / limit)
          }
        }
      });

    } catch (error) {
      console.error('Error listing charities:', error);
      return res.status(500).json({
        success: false,
        error: 'Lỗi khi lấy danh sách tổ chức từ thiện'
      });
    }
  }
}

module.exports = new CharitiesController(); 