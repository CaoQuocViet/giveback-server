const { Op } = require('sequelize');
const { Campaign, Charity, User } = require('../models');

const getCampaignsList = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 9,
      status,
      rating,
      search
    } = req.query;

    // Xây dựng điều kiện tìm kiếm
    const where = {};
    
    // Lọc theo trạng thái
    if (status && status !== 'all') {
      where.status = status;
    }

    // Lọc theo rating
    if (rating && rating !== 'all') {
      where.rating = {
        [Op.gte]: parseFloat(rating)
      };
    }

    // Tìm kiếm theo title
    if (search) {
      where.title = {
        [Op.iLike]: `%${search}%`
      };
    }

    // Thực hiện query với pagination
    const { count, rows } = await Campaign.findAndCountAll({
      where,
      attributes: [
        'id',
        'title',
        'description',
        'images',
        'targetAmount',
        'currentAmount',
        'startDate',
        'endDate',
        'status',
        'rating',
        'created_at'
      ],
      include: [{
        model: Charity,
        as: 'charity',
        required: false,
        attributes: ['title'],
        include: [{
          model: User,
          as: 'user',
          required: false,
          attributes: ['fullName', 'profileImage']
        }]
      }],
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit)
    });

    // Transform data trước khi trả về
    const campaigns = rows.map(campaign => {
      // Hàm helper để format date an toàn
      const formatDate = (dateString) => {
        if (!dateString) return null;
        try {
          const date = new Date(dateString);
          // Kiểm tra date có hợp lệ không
          if (isNaN(date.getTime())) return null;
          return date.toISOString();
        } catch (err) {
          console.error('Error formatting date:', dateString, err);
          return null;
        }
      };

      return {
        id: campaign.id,
        title: campaign.title,
        description: campaign.description,
        campaign_image: campaign.images,
        target_amount: parseFloat(campaign.targetAmount) || 0,
        current_amount: parseFloat(campaign.currentAmount) || 0,
        start_date: formatDate(campaign.startDate),
        end_date: formatDate(campaign.endDate),
        status: campaign.status,
        rating: parseFloat(campaign.rating) || 0,
        created_at: formatDate(campaign.created_at),
        charity: campaign.charity ? {
          name: campaign.charity.title,
          logo: campaign.charity.user?.profileImage
        } : null
      };
    });

    return res.json({
      success: true,
      data: {
        campaigns,
        pagination: {
          total: count,
          page: parseInt(page),
          total_pages: Math.ceil(count / parseInt(limit))
        }
      }
    });

  } catch (error) {
    console.error('Error in getCampaignsList:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách chiến dịch',
      error: error.message
    });
  }
};

module.exports = {
  getCampaignsList
}; 