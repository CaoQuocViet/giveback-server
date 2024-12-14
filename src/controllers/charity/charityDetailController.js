const { Charity, Campaign, Donation, User } = require('../../models');
const { Op } = require('sequelize');

exports.getCharityDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    // Query charity info with user details
    const charity = await Charity.findOne({
      where: { id },
      include: [{
        model: User,
        as: 'user',
        attributes: ['fullName', 'email', 'phone', 'profileImage', 'province', 'district', 'ward', 'address']
      }],
      attributes: {
        exclude: ['apiKey']
      }
    });

    if (!charity) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy tổ chức'
      });
    }

    // Query all campaigns of the charity
    const campaigns = await Campaign.findAll({
      where: {
        charityId: id,
        status: {
          [Op.in]: ['STARTING', 'ONGOING', 'CLOSED', 'COMPLETED']
        }
      },
      order: [['startDate', 'DESC']] // Sort by start date descending
    });

    // Calculate total donations
    const totalDonations = await Donation.sum('amount', {
      where: {
        status: 'SUCCESS',
        campaignId: {
          [Op.in]: campaigns.map(c => c.id)
        }
      }
    });

    // Format response to match frontend requirements
    const response = {
      // Basic info
      id: charity.id,
      title: charity.title,
      description: charity.description,
      avatar: charity.user.profileImage ? `${baseUrl}/storage/${charity.user.profileImage}` : null,
      
      // Contact info
      email: charity.user.email,
      phone: charity.user.phone,
      province: charity.user.province,
      district: charity.user.district,
      ward: charity.user.ward,
      address: charity.user.address,

      // Organization info
      verificationStatus: charity.verificationStatus,
      foundingDate: charity.foundingDate,
      website: charity.website,
      socialLinks: charity.socialLinks || {},
      rating: Number(charity.rating) || 0,

      // License info
      licenseNumber: charity.licenseNumber,
      licenseDate: charity.licenseDate,
      licenseIssuer: charity.licenseIssuer,
      licenseDescription: charity.licenseDescription,
      licenseImageUrl: charity.licenseImageUrl ? `${baseUrl}/storage/${charity.licenseImageUrl}` : null,

      // Statistics
      statistics: {
        totalCampaigns: campaigns.length,
        totalRaised: totalDonations || 0,
        activeCampaigns: campaigns.filter(c => c.status === 'ONGOING').length,
        completedCampaigns: campaigns.filter(c => c.status === 'COMPLETED').length
      },

      campaigns: campaigns.map(campaign => ({
        id: campaign.id,
        title: campaign.title,
        status: campaign.status,
        targetAmount: campaign.targetAmount,
        currentAmount: campaign.currentAmount,
        startDate: campaign.startDate,
        endDate: campaign.endDate
      }))
    };

    return res.status(200).json({
      success: true,
      data: response
    });

  } catch (error) {
    console.error('Get charity detail error:', error);
    return res.status(500).json({
      success: false,
      message: 'Đã có lỗi xảy ra khi lấy thông tin tổ chức',
      error: error.message
    });
  }
}; 