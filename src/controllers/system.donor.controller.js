const { Donation, User, Campaign } = require('../models');

exports.createDonation = async (req, res) => {
  console.log("Received donation request:", req.body);
  const { campaignId, amount, note } = req.body;

  try {
    console.log("Looking for campaign with ID:", campaignId);
    const campaign = await Campaign.findByPk(campaignId);
    console.log("Found campaign:", campaign);
    
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Chiến dịch không tồn tại"
      });
    }

    // Tạo khoản đóng góp mới với các trường bắt buộc
    const donation = await Donation.create({
      campaignId,
      donorId: 'system_donor',
      amount,
      note,
      paymentMethodId: 'payment_method_2', // Sử dụng payment_method_id từ seeder
      isIntermediate: true,
      status: 'SUCCESS',
      isAnonymous: false
    });

    // Cập nhật currentAmount của campaign
    await campaign.increment('currentAmount', { by: amount });

    return res.status(201).json({
      success: true,
      data: donation
    });
  } catch (error) {
    console.error("Error creating donation:", error);
    return res.status(500).json({
      success: false,
      message: "Đã có lỗi xảy ra",
      error: error.message
    });
  }
}; 