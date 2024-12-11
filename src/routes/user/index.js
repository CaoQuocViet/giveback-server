const router = require('express').Router();
const profileRoutes = require('./profileRoutes');

router.use('/profile', profileRoutes);

module.exports = router; 