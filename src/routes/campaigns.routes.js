const express = require('express');
const router = express.Router();
const { getCampaignsList } = require('../controllers/campaigns.controller');
const { authMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, getCampaignsList);

module.exports = router; 