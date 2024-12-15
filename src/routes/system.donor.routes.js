const express = require('express');
const router = express.Router();
const { createDonation } = require('../controllers/system.donor.controller');

// Tạo khoản đóng góp mới
router.post('/donations', createDonation);

module.exports = router; 