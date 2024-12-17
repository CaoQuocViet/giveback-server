const router = require('express').Router();
const { register, sendOTP, verifyOTP } = require('../../controllers/auth/registerController');

router.post('/', register);
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

module.exports = router; 