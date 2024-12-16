const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donation.controller');
const { authenticateToken } = require('../middleware/auth');

// Tạo donation mới và redirect đến ZaloPay
router.post('/donations', authenticateToken, donationController.createDonation);

// Callback URL cho ZaloPay
router.post('/donations/callback', donationController.handleCallback);

// Kiểm tra trạng thái donation
router.get('/donations/:donationId/status', authenticateToken, donationController.checkStatus);

module.exports = router;