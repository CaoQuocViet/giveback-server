const router = require('express').Router();
const { authenticateToken } = require('../../middleware/auth');
const { authorizeCharity } = require('../../middleware/authorize');
const campaignUpload = require('../../middleware/campaignUpload');
const { createCampaign } = require('../../controllers/charity/campaignCreateController');

router.use(authenticateToken);
router.use(authorizeCharity);

router.post('/', campaignUpload.single('image'), createCampaign);

module.exports = router; 