const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth');
const statisticsController = require('../controllers/statistics.controller');

router.get('/overview', authMiddleware, statisticsController.getSystemOverview);

module.exports = router;