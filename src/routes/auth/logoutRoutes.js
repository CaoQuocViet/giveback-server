const router = require('express').Router();
const { logout } = require('../../controllers/auth/logoutController');

router.post('/', logout);

module.exports = router; 