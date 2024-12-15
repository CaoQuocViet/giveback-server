const express = require('express');
const router = express.Router();
const distributionController = require('../../controllers/charity/distributionController');
const { authMiddleware } = require('../../middleware/auth');
const upload = require('../../middleware/upload');

// GET /api/charity/distributions/available-campaigns
router.get(
  '/available-campaigns',
  authMiddleware,
  async (req, res, next) => {
    console.log('Auth middleware passed, user:', req.user);
    next();
  },
  distributionController.getAvailableCampaigns
);

// POST /api/charity/distributions
router.post(
  '/',
  authMiddleware,
  upload.single('proofImage'),
  distributionController.createDistribution
);

module.exports = router; 