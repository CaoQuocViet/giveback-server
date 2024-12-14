const { Donation, Campaign, Charity, PaymentMethod } = require('../../models');

exports.getDonorDonationHistory = async (req, res) => {
  try {
    const donorId = req.user.id;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: donations } = await Donation.findAndCountAll({
      where: { donorId },
      attributes: [
        'id',
        'amount',
        'paymentTransactionId',
        'status',
        'note',
        'isAnonymous',
        'created_at'
      ],
      include: [
        {
          model: Campaign,
          as: 'campaign',
          attributes: ['id', 'title'],
          include: [
            {
              model: Charity,
              as: 'charity',
              attributes: ['id', 'title']
            }
          ]
        },
        {
          model: PaymentMethod,
          as: 'paymentMethod',
          attributes: ['id', 'name']
        }
      ],
      order: [['created_at', 'DESC']],
      offset,
      limit: parseInt(limit)
    });

    // Transform data to match frontend interface
    const transformedDonations = donations.map(donation => ({
      id: donation.id,
      campaignTitle: donation.campaign.title,
      charityTitle: donation.campaign.charity.title,
      paymentMethod: donation.paymentMethod.name,
      transactionId: donation.paymentTransactionId,
      amount: parseFloat(donation.amount),
      status: donation.status,
      note: donation.note,
      isAnonymous: donation.isAnonymous,
      createdAt: donation.created_at
    }));

    return res.json({
      success: true,
      data: {
        donations: transformedDonations,
        pagination: {
          total: count,
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error("Get donor donation history error:", error);
    return res.status(500).json({
      success: false,
      message: "Đã có lỗi xảy ra khi lấy lịch sử đóng góp",
      error: error.message
    });
  }
}; 