const router = require('express').Router();
const campaignManagementRoutes = require('./campaignManagementRoutes');
const charityDetailRoutes = require('./charityDetailRoutes');

router.use('/campaigns', campaignManagementRoutes);
router.use('/', charityDetailRoutes);

module.exports = router; 