const { Campaign, Charity, User, Distribution, Comment } = require("../models");
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
			shareUrl: `${process.env.FRONTEND_URL}/campaigns/${campaign.id}`,
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
				created_at: comment.createdAt,
			})),
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
