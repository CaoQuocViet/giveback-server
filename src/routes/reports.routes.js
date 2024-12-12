const express = require("express");
const router = express.Router();
const reportsController = require("../controllers/reports.controller");

// Routes for fetching reports
router.get("/campaign", reportsController.getCampaignReport);
router.get("/charity", reportsController.getCharityReport);
router.get("/donation", reportsController.getDonationReport);
router.get("/distribution", reportsController.getDistributionReport);

// Routes for exporting reports
router.get("/campaign/export", reportsController.exportCampaignReport);
router.get("/charity/export", reportsController.exportCharityReport);
router.get("/donation/export", reportsController.exportDonationReport);
router.get("/distribution/export", reportsController.exportDistributionReport);

module.exports = router;
