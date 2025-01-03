const { Campaign, Charity } = require('../../models');
const { Op } = require('sequelize');

exports.getCharityCampaigns = async (req, res) => {
  try {
    const charityId = req.user.charityId;
    
    if (!charityId) {
      return res.status(400).json({
        success: false,
        message: 'Không tìm thấy thông tin tổ chức từ thiện'
      });
    }

    const campaigns = await Campaign.findAll({
      where: {
        charity_id: charityId
      },
      attributes: [
        'id',
        'title',
        'status',
        ['start_date', 'startDate'],
        ['end_date', 'endDate'],
        ['updated_at', 'updatedAt']
      ],
      order: [['updated_at', 'DESC']]
    });

    const formattedCampaigns = campaigns.map(campaign => {
      const formatDate = (date) => {
        if (!date) return null;
        return date;
      };

      return {
        id: campaign.id,
        title: campaign.title,
        status: campaign.status,
        startDate: formatDate(campaign.getDataValue('startDate')),
        endDate: formatDate(campaign.getDataValue('endDate')),
        updatedAt: formatDate(campaign.getDataValue('updatedAt'))
      };
    });

    return res.json({
      success: true,
      data: formattedCampaigns
    });
  } catch (error) {
    console.error('Get charity campaigns error:', error);
    return res.status(500).json({
      success: false,
      message: 'Đã có lỗi xảy ra khi lấy danh sách chiến dịch'
    });
  }
};

exports.deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const charityId = req.user.charityId;

    const campaign = await Campaign.findOne({
      where: {
        id: id,
        charity_id: charityId,
        status: 'STARTING'
      }
    });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy chiến dịch hoặc không có quyền xóa'
      });
    }

    await campaign.destroy();

    return res.json({
      success: true,
      message: 'Xóa chiến dịch thành công'
    });
  } catch (error) {
    console.error('Delete campaign error:', error);
    return res.status(500).json({
      success: false,
      message: 'Đã có lỗi xảy ra khi xóa chiến dịch'
    });
  }
};

exports.updateCharityStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['VERIFIED', 'REJECTED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Trạng thái không hợp lệ'
      });
    }

    // Find and update charity
    const charity = await Charity.findByPk(id);
    
    if (!charity) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy tổ chức từ thiện'
      });
    }

    // Update verification_status instead of status
    await charity.update({ verification_status: status });
    await charity.save();

    return res.json({
      success: true,
      message: `${status === 'VERIFIED' ? 'Xác thực' : 'Từ chối'} tổ chức thành công`
    });

  } catch (error) {
    console.error('Update charity status error:', error);
    return res.status(500).json({
      success: false,
      message: 'Đã có lỗi xảy ra khi cập nhật trạng thái tổ chức'
    });
  }
}; 