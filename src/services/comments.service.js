const { Comment, User } = require("../models");

/**
 * Fetch comments for a specific campaign.
 * @param {string} campaignId - The ID of the campaign.
 * @returns {Promise<Array>} - List of comments.
 */
const getCommentsByCampaign = async (campaignId) => {
	const comments = await Comment.findAll({
		where: { campaignId },
		include: [
			{
				model: User,
				as: "user",
				attributes: ["id", "full_name", "role", "profile_image"],
			},
		],
		order: [["created_at", "DESC"]],
	});
	return comments;
};

/**
 * Create a new comment for a specific campaign.
 * @param {string} campaignId - The ID of the campaign.
 * @param {string} userId - The ID of the user creating the comment.
 * @param {string} content - The content of the comment.
 * @param {number} rating - The rating provided in the comment.
 * @param {string} role - The role of the user.
 * @returns {Promise<Comment>} - The created comment.
 */
const createComment = async (campaignId, userId, content, rating, role) => {
	const comment = await Comment.create({
		campaignId,
		userId,
		content,
		rating,
		role,
	});
	return comment;
};

module.exports = {
	getCommentsByCampaign,
	createComment,
};
