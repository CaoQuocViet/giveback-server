const { Campaign, Charity, User, Distribution, Comment, Donation, PaymentMethod } = require("../models");
const { sequelize } = require("../models");

exports.getCampaignDetail = async (req, res) => {
	try {
		const { id } = req.params;
		const baseUrl = `${req.protocol}://${req.get('host')}`;

		const campaign = await Campaign.findOne({
			where: { id },
			attributes: [
				"id",
				"title",
				"description",
				"detailGoal",
				"images",
				"targetAmount",
				"currentAmount",
				"startDate",
				"endDate",
				"status",
				"rating",
				"address",
				"ward",
				"district",
				"province",
			],
			include: [
				{
					model: Charity,
					as: "charity",
					attributes: ["title"],
					include: [
						{
							model: User,
							as: "user",
							attributes: ["full_name"],
						},
					],
				},
				{
					model: Distribution,
					as: "distributions",
					attributes: [
						"id",
						"title",
						"description",
						"reliefDate",
						"budget",
						"beneficiaryCount",
						"address",
						"ward",
						"district",
						"province",
					],
				},
				{
					model: Comment,
					as: "comments",
					attributes: ["content", "rating", "created_at"],
					include: [
						{
							model: User,
							as: "user",
							attributes: ["fullName", "role", "profileImage"],
						},
					],
				},
				{
					model: Donation,
					as: "donations",
					attributes: [
						"id", 
						"amount",
						"note",
						"invoice_code",
						"payment_transaction_id",
						"is_anonymous",
						"status",
						"created_at"
					],
					include: [
						{
							model: User,
							as: "donor",
							attributes: ["fullName", "role", "profileImage"]
						},
						{
							model: PaymentMethod,
							as: "paymentMethod",
							attributes: ["name"]
						}
					]
				}
			],
		});

		if (!campaign) {
			return res.status(404).json({
				success: false,
					message: "Không tìm thấy chiến dịch",
			});
		}

		// Calculate total_distributed from distributions
		const total_distributed = campaign.distributions.reduce(
			(sum, dist) => sum + (parseFloat(dist.budget) || 0), 
			0
		);

		const transformedData = {
			id: campaign.id,
			title: campaign.title,
			charity: {
				name: campaign.charity.title,
				representative: campaign.charity.user.full_name,
			},
			status: campaign.status,
			images: campaign.images,
			timeline: {
				start_date: campaign.startDate,
				end_date: campaign.endDate,
			},
			location: {
				address: campaign.address,
				ward: campaign.ward,
				district: campaign.district,
				province: campaign.province,
			},
			budget: {
				target: parseFloat(campaign.targetAmount),
				current: parseFloat(campaign.currentAmount),
				total_distributed: total_distributed,
			},
			rating: parseFloat(campaign.rating),
			description: campaign.description,
			detailGoal: campaign.detailGoal,
			shareUrl: `${process.env.FRONTEND_URL}/dashboard/campaigns/${campaign.id}`,
			distributions: campaign.distributions.map((dist) => ({
				title: dist.title,
				description: dist.description,
				relief_date: dist.reliefDate,
				budget: parseFloat(dist.budget),
				beneficiary_count: dist.beneficiaryCount,
				location: {
					address: dist.address,
					ward: dist.ward,
					district: dist.district,
					province: dist.province,
				},
			})),
			comments: campaign.comments.map((comment) => ({
				user: {
					name: comment.user.fullName,
					role: comment.user.role,
					avatar: comment.user.profileImage ? `${baseUrl}/storage/${comment.user.profileImage}` : null,
				},
				content: comment.content,
				rating: parseFloat(comment.rating),
				created_at: comment.created_at,
			})),
			donations: campaign.donations.map(donation => ({
				id: donation.id,
				donor: donation.is_anonymous ? {
					name: "Nhà hảo tâm ẩn danh",
					role: "DONOR",
					avatar: `${baseUrl}/storage/profile/system_donor_avatar.png` || null
				} : {
					name: donation.donor.fullName,
					role: donation.donor.role,
					avatar: donation.donor.profileImage ? `${baseUrl}/storage/${donation.donor.profileImage}` : null
				},
				amount: parseFloat(donation.amount),
				message: donation.note,
				payment_method: donation.paymentMethod.name,
				invoice_code: donation.invoice_code || null,
				transaction_id: donation.payment_transaction_id || null,
				status: donation.status,
				created_at: donation.created_at
			}))
		};

		return res.json({
			success: true,
			data: transformedData,
		});
	} catch (error) {
		console.error("Error in getCampaignDetail:", error);
		return res.status(500).json({
			success: false,
			message: "Lỗi khi lấy thông tin chiến dịch",
			error: error.message,
		});
	}
};
