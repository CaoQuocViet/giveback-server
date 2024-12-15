const router = require('express').Router();
const { getDonorDonationHistory } = require('../../controllers/user/donorDonationHistoryController');
const { authMiddleware } = require('../../middleware/auth');

router.get('/', authMiddleware, getDonorDonationHistory);

module.exports = router; 