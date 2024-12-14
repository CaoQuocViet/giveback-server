const router = require('express').Router();
const { authenticateToken } = require('../../middleware/auth');
const { authorizeCharity } = require('../../middleware/authorize');
const {
  getCharityCampaigns,
  deleteCampaign
} = require('../../controllers/charity/campaignManagementController');

// Áp dụng middleware xác thực và phân quyền cho tất cả các route
router.use(authenticateToken);
router.use(authorizeCharity);

router.get('/', getCharityCampaigns);
router.delete('/:id', deleteCampaign);

module.exports = router; 