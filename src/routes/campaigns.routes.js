const express = require('express');
const router = express.Router();
const { getCampaignsList } = require('../controllers/campaigns.controller');
const { authMiddleware } = require('../middlewares/auth');

router.get('/', authMiddleware, getCampaignsList);

module.exports = router; 