const router = require('express').Router();
const campaignManagementRoutes = require('./campaignManagementRoutes');

router.use('/campaigns', campaignManagementRoutes);

module.exports = router; 