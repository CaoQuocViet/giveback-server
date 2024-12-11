const express = require('express');
const router = express.Router();
const charityController = require('../controllers/charities.controller');
const { authMiddleware } = require('../middlewares/auth');

// GET /api/charities - Lấy danh sách tổ chức từ thiện
router.get('/', authMiddleware, charityController.listCharities);

module.exports = router; 