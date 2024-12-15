const { Op } = require('sequelize');
const { Charity, User, Campaign, Donation } = require('../models');

class CharitiesController {
  async listCharities(req, res) {
    try {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      
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

      // Transform data để thêm baseUrl vào profile_image
      const transformedCharities = charities.map(charity => {
        const plainCharity = charity.get({ plain: true });
        return {
          ...plainCharity,
          user: {
            full_name: plainCharity.user.full_name,
            profile_image: plainCharity.user.profile_image ? 
              `${baseUrl}/storage/${plainCharity.user.profile_image}` : null
          }
        };
      });

      return res.json({
        success: true,
        data: {
          charities: transformedCharities,
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

  async verifyCharity(req, res) {
    try {
      const { id } = req.params;
      const { role } = req.user;

      if (role !== 'ADMIN') {
        return res.status(403).json({
          success: false,
          message: 'Không có quyền thực hiện thao tác này'
        });
      }
      
      const charity = await Charity.findByPk(id);
      if (!charity) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy tổ chức'
        });
      }

      if (charity.verification_status === 'VERIFIED') {
        return res.status(400).json({
          success: false,
          message: 'Tổ chức đã được xác thực'
        });
      }

      await charity.update({ verification_status: 'VERIFIED' });
      await charity.save();

      return res.json({
        success: true,
        message: 'Đã xác thực tổ chức thành công'
      });

    } catch (error) {
      console.error('Error verifying charity:', error);
      return res.status(500).json({
        success: false,
        message: 'Lỗi khi xác thực tổ chức'
      });
    }
  }

  async rejectCharity(req, res) {
    try {
      const { id } = req.params;
      const { role } = req.user;

      if (role !== 'ADMIN') {
        return res.status(403).json({
          success: false,
          message: 'Không có quyền thực hiện thao tác này'
        });
      }
      
      const charity = await Charity.findByPk(id);
      if (!charity) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy tổ chức'
        });
      }

      if (charity.verification_status === 'REJECTED') {
        return res.status(400).json({
          success: false,
          message: 'Tổ chức đã bị từ chối xác thực'
        });
      }

      await charity.update({ verification_status: 'REJECTED' });
      await charity.save();

      return res.json({
        success: true,
        message: 'Đã từ chối xác thực tổ chức'
      });

    } catch (error) {
      console.error('Error rejecting charity:', error);
      return res.status(500).json({
        success: false,
        message: 'Lỗi khi từ chối xác thực tổ chức'
      });
    }
  }
}

module.exports = new CharitiesController(); 