const express = require("express");
const router = express.Router();
const {
	getCampaignDetail,
} = require("../controllers/campaign.detail.controller");
const { authMiddleware } = require("../middleware/auth");

// GET chi tiết chiến dịch
router.get("/:id", authMiddleware, getCampaignDetail);

module.exports = router;
