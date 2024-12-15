// server/giveback-server/src/routes/comments.routes.js
const express = require("express");
const router = express.Router({ mergeParams: true });
const commentsController = require("../controllers/comments.controller");
const { authMiddleware } = require("../middleware/auth");

// GET /campaigns/:id/comments - Fetch comments for a campaign
router.get("/", commentsController.getComments);

// POST /campaigns/:id/comments - Add a new comment to a campaign (Protected)
router.post("/", authMiddleware, commentsController.createComment);

module.exports = router;
