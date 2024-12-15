const express = require('express');
const router = express.Router();
const charityController = require('../controllers/charities.controller');
const { authMiddleware } = require('../middlewares/auth');

// GET /api/charities - Lấy danh sách tổ chức từ thiện
router.get('/', authMiddleware, charityController.listCharities);

// PATCH /api/charities/:id/verify - Xác thực tổ chức
router.patch('/:id/verify', authMiddleware, charityController.verifyCharity);

// PATCH /api/charities/:id/reject - Từ chối xác thực tổ chức
router.patch('/:id/reject', authMiddleware, charityController.rejectCharity);

module.exports = router; 