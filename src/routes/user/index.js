const router = require('express').Router();
const profileRoutes = require('./profileRoutes');
const charityProfileRoutes = require('./charityProfileRoutes');

router.use('/profile', profileRoutes);
router.use('/charity', charityProfileRoutes);

module.exports = router; 