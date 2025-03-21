const router = require('express').Router();
const { getProfile, updateProfile } = require('../../controllers/user/profileController');
const { authMiddleware } = require('../../middleware/auth');

router.get('/', authMiddleware, getProfile);
router.put('/', authMiddleware, updateProfile);

module.exports = router; 