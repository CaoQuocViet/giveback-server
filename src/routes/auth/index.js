const router = require('express').Router();
const loginRoutes = require('./loginRoutes');
const logoutRoutes = require('./logoutRoutes');
const registerRoutes = require('./registerRoutes');
const otpRoutes = require('./otpRoutes');

router.use('/login', loginRoutes);
router.use('/logout', logoutRoutes);
router.use('/register', registerRoutes);
router.use('/otp', otpRoutes);

module.exports = router; 