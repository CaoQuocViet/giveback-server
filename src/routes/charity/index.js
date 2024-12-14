const router = require('express').Router();
const charityDetailRoutes = require('./charityDetailRoutes');

router.use('/', charityDetailRoutes);

module.exports = router; 