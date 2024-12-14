const router = require('express').Router();
const { authenticateToken } = require('../../middleware/auth');
const { getCharityDetail } = require('../../controllers/charity/charityDetailController');

router.get('/:id', authenticateToken, getCharityDetail);

module.exports = router; 