const { Campaign } = require('../../models');
const path = require('path');

exports.createCampaign = async (req, res) => {
  try {
    const charityId = req.user.id;
    const {
      title,
      description,
      detailGoal,
      targetAmount,
      startDate,
      endDate,
      province,
      district,
      ward,
      address
    } = req.body;

    // Validate required fields
    if (!title || !targetAmount || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng điền đầy đủ thông tin bắt buộc'
      });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    if (start < now) {
      return res.status(400).json({
        success: false,
        message: 'Ngày bắt đầu phải sau ngày hiện tại'
      });
    }

    if (end <= start) {
      return res.status(400).json({
        success: false,
        message: 'Ngày kết thúc phải sau ngày bắt đầu'
      });
    }

    // Handle image upload
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng tải lên hình ảnh chiến dịch'
      });
    }

    // Lưu đường dẫn ảnh theo format campaigns/filename
    const imagePath = path.join('campaigns', req.file.filename);

    // Create campaign
    const campaign = await Campaign.create({
      charityId,
      title,
      description,
      detailGoal,
      targetAmount: Number(targetAmount),
      startDate,
      endDate,
      province,
      district,
      ward,
      address,
      images: imagePath,
      status: 'STARTING'
    });

    return res.status(201).json({
      success: true,
      message: 'Tạo chiến dịch thành công',
      data: {
        id: campaign.id,
        status: campaign.status,
        created_at: campaign.created_at
      }
    });

  } catch (error) {
    console.error('Create campaign error:', error);
    return res.status(500).json({
      success: false,
      message: 'Đã có lỗi xảy ra khi tạo chiến dịch',
      error: error.message
    });
  }
}; 