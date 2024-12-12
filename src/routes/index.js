const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const campaignRoutes = require('./campaigns.route');
const charityRoutes = require('./charityRoutes');
const donationRoutes = require('./donationRoutes');
const administrativeRoutes = require('./administrative.routes');
const statisticsRoutes = require('./statistics.routes');

module.exports = {
  authRoutes,
  userRoutes,
  campaignRoutes,
  charityRoutes,
  donationRoutes,
  administrativeRoutes,
  statisticsRoutes
};