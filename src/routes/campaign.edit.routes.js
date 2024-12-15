const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const campaignEditController = require('../controllers/campaign.edit.controller');
const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024 // Giới hạn 20MB
  }
});

// Get campaign for editing
router.get('/:id', authMiddleware, campaignEditController.getCampaignForEdit);

// Update campaign
router.put('/:id', authMiddleware, upload.single('images'), campaignEditController.updateCampaign);

module.exports = router; 