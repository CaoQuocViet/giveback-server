const router = require('express').Router();
const { getDonorDonationHistory } = require('../../controllers/user/donorDonationHistoryController');
const { authMiddleware } = require('../../middlewares/auth');

router.get('/', authMiddleware, getDonorDonationHistory);

module.exports = router; 