const router = require('express').Router();
const { verifyOTP, resendOTP } = require('../../controllers/auth/otpController');

router.post('/verify', verifyOTP);
router.post('/resend', resendOTP);

module.exports = router; 