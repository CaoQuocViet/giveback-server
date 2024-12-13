const { Campaign, Charity, User, Distribution, Comment } = require('../models');
const { sequelize } = require('../models');

exports.getCampaignDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const campaign = await Campaign.findOne({
      where: { id },
      attributes: [
        'id',
        'title',
        'description',
        'detail_goal',
        'images',
        'target_amount',
        'current_amount',
        'start_date',
        'end_date',
        'status',
        'rating',
        'address',
        'ward',
        'district',
        'province',
        [
          sequelize.literal(`(
            SELECT COALESCE(SUM(budget), 0)
            FROM "Distributions"
            WHERE campaign_id = "Campaign".id
          )`),
          'total_distributed'
        ]
      ],
      include: [
        {
          model: Charity,
          as: 'charity',
          attributes: ['title'],
          include: [{
            model: User,
            as: 'user',
            attributes: ['full_name']
          }]
        },
        {
          model: Distribution,
          as: 'distributions',
          attributes: [
            'title',
            'description',
            'relief_date',
            'budget',
            'beneficiary_count',
            'address',
            'ward',
            'district',
            'province'
          ]
        },
        {
          model: Comment,
          as: 'comments',
          attributes: [
            'content',
            'rating',
            'created_at'
          ],
          include: [{
            model: User,
            as: 'user',
            attributes: ['full_name', 'role', 'profile_image']
          }]
        }
      ]
    });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy chiến dịch'
      });
    }

    // Transform data
    const transformedData = {
      id: campaign.id,
      title: campaign.title,
      charity: {
        name: campaign.charity.title,
        representative: campaign.charity.user.full_name
      },
      status: campaign.status,
      images: campaign.images,
      timeline: {
        start_date: campaign.start_date,
        end_date: campaign.end_date
      },
      location: {
        address: campaign.address,
        ward: campaign.ward,
        district: campaign.district,
        province: campaign.province
      },
      budget: {
        target: parseFloat(campaign.target_amount),
        current: parseFloat(campaign.current_amount),
        distributed: parseFloat(campaign.total_distributed)
      },
      rating: parseFloat(campaign.rating),
      description: campaign.description,
      detail_goal: campaign.detail_goal,
      share_url: `${process.env.FRONTEND_URL}/campaigns/${campaign.id}`,
      distributions: campaign.distributions.map(dist => ({
        title: dist.title,
        description: dist.description,
        relief_date: dist.relief_date,
        budget: parseFloat(dist.budget),
        beneficiary_count: dist.beneficiary_count,
        location: {
          address: dist.address,
          ward: dist.ward,
          district: dist.district,
          province: dist.province
        }
      })),
      comments: campaign.comments.map(comment => ({
        user: {
          name: comment.user.full_name,
          role: comment.user.role,
          avatar: comment.user.profile_image
        },
        content: comment.content,
        rating: parseFloat(comment.rating),
        created_at: comment.created_at
      }))
    };

    return res.json({
      success: true,
      data: transformedData
    });

  } catch (error) {
    console.error('Error in getCampaignDetail:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin chiến dịch',
      error: error.message
    });
  }
}; 