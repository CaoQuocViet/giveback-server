const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const campaignEditController = require('../controllers/campaign.edit.controller');

// Get campaign for editing
router.get('/:id', authMiddleware, campaignEditController.getCampaignForEdit);

// Update campaign
router.put('/:id', authMiddleware, campaignEditController.updateCampaign);

module.exports = router; 