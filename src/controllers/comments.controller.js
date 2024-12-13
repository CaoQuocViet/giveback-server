// server/giveback-server/src/controllers/comments.controller.js
const commentsService = require("../services/comments.service");

/**
 * Controller to get comments for a campaign.
 */
const getComments = async (req, res) => {
	try {
		const { id: campaignId } = req.params;
		const comments = await commentsService.getCommentsByCampaign(campaignId);
		return res.status(200).json({
			success: true,
			data: comments,
		});
	} catch (error) {
		console.error("Error fetching comments:", error);
		return res.status(500).json({
			success: false,
			message: "Lỗi khi lấy danh sách bình luận",
			error: error.message,
		});
	}
};

/**
 * Controller to create a new comment for a campaign.
 */
const createCommentController = async (req, res) => {
	try {
		const { id: campaignId } = req.params;
		const { content, rating } = req.body;
		const userId = req.user.id;
		const role = req.user.role;

		// Validate input
		if (!content || typeof content !== "string") {
			return res.status(400).json({
				success: false,
				message: "Nội dung bình luận là bắt buộc và phải là chuỗi.",
			});
		}

		if (rating === undefined || isNaN(rating) || rating < 0 || rating > 5) {
			return res.status(400).json({
				success: false,
				message: "Đánh giá phải là số trong khoảng từ 0 đến 5.",
			});
		}

		const newComment = await commentsService.createComment(
			campaignId,
			userId,
			content,
			rating,
			role
		);

		// Fetch the newly created comment with user details
		const createdComment = await commentsService.getCommentsByCampaign(
			campaignId,
		);
		const latestComment = createdComment.find(
			(comment) => comment.id === newComment.id,
		);

		return res.status(201).json({
			success: true,
			message: "Bình luận đã được thêm thành công.",
			data: latestComment,
		});
	} catch (error) {
		console.error("Error creating comment:", error);
		return res.status(500).json({
			success: false,
			message: "Lỗi khi thêm bình luận",
			error: error.message,
		});
	}
};

module.exports = {
	getComments,
	createComment: createCommentController,
};
