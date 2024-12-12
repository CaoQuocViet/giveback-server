const reportsService = require("../services/reports.service");
const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");
const { pipeline } = require("stream");
const { promisify } = require("util");
const streamPipeline = promisify(pipeline);
const path = require("path");

// Fetch Reports
exports.getCampaignReport = async (req, res) => {
	try {
		const report = await reportsService.getCampaignReport();
		return res.json({ success: true, data: report });
	} catch (error) {
		console.error("Error fetching campaign report:", error);
		return res
			.status(500)
			.json({ success: false, message: "Failed to fetch campaign report" });
	}
};

exports.getCharityReport = async (req, res) => {
	try {
		const report = await reportsService.getCharityReport();
		return res.json({ success: true, data: report });
	} catch (error) {
		console.error("Error fetching charity report:", error);
		return res
			.status(500)
			.json({ success: false, message: "Failed to fetch charity report" });
	}
};

exports.getDonationReport = async (req, res) => {
	try {
		const report = await reportsService.getDonationReport();
		return res.json({ success: true, data: report });
	} catch (error) {
		console.error("Error fetching donation report:", error);
		return res
			.status(500)
			.json({ success: false, message: "Failed to fetch donation report" });
	}
};

exports.getDistributionReport = async (req, res) => {
	try {
		const report = await reportsService.getDistributionReport();
		return res.json({ success: true, data: report });
	} catch (error) {
		console.error("Error fetching distribution report:", error);
		return res
			.status(500)
			.json({ success: false, message: "Failed to fetch distribution report" });
	}
};

// Export Reports
exports.exportCampaignReport = async (req, res) => {
	try {
		const format = req.query.format || "pdf"; // Default to PDF
		const report = await reportsService.getCampaignReport();

		if (format === "excel") {
			await exportCampaignToExcel(report, res);
		} else {
			await exportCampaignToPDF(report, res);
		}
	} catch (error) {
		console.error("Error exporting campaign report:", error);
		return res
			.status(500)
			.json({ success: false, message: "Failed to export campaign report" });
	}
};

exports.exportCharityReport = async (req, res) => {
	try {
		const format = req.query.format || "pdf";
		const report = await reportsService.getCharityReport();

		if (format === "excel") {
			await exportCharityToExcel(report, res);
		} else {
			await exportCharityToPDF(report, res);
		}
	} catch (error) {
		console.error("Error exporting charity report:", error);
		return res
			.status(500)
			.json({ success: false, message: "Failed to export charity report" });
	}
};

exports.exportDonationReport = async (req, res) => {
	try {
		const format = req.query.format || "pdf";
		const report = await reportsService.getDonationReport();

		if (format === "excel") {
			await exportDonationToExcel(report, res);
		} else {
			await exportDonationToPDF(report, res);
		}
	} catch (error) {
		console.error("Error exporting donation report:", error);
		return res
			.status(500)
			.json({ success: false, message: "Failed to export donation report" });
	}
};

exports.exportDistributionReport = async (req, res) => {
	try {
		const format = req.query.format || "pdf";
		const report = await reportsService.getDistributionReport();

		if (format === "excel") {
			await exportDistributionToExcel(report, res);
		} else {
			await exportDistributionToPDF(report, res);
		}
	} catch (error) {
		console.error("Error exporting distribution report:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to export distribution report",
		});
	}
};

// Export Functions

// Add a helper function to create a PDF document with the custom font
const createPDFDocument = () => {
	const doc = new PDFDocument();
	// Path to the custom font
	const fontPath = path.join(__dirname, "..", "fonts", "Roboto-Regular.ttf");
	doc.registerFont("Roboto", fontPath);
	doc.font("Roboto");
	return doc;
};

const exportCampaignToPDF = async (report, res) => {
	const doc = createPDFDocument();
	res.setHeader(
		"Content-Disposition",
		'attachment; filename="campaign_report.pdf"',
	);
	res.setHeader("Content-Type", "application/pdf");
	doc.pipe(res);

	doc.fontSize(18).text("Campaign Report", { align: "center" });
	doc.moveDown();

	report.forEach((campaign) => {
		doc.fontSize(12).text(`Title: ${campaign.title}`);
		doc.text(`Total Received: ${campaign.totalReceived}`);
		doc.text(`Total Distributed: ${campaign.totalDistributed}`);
		doc.text(`Number of Donors: ${campaign.donorCount}`);
		doc.text(`Number of Distributions: ${campaign.distributionCount}`);
		doc.text(`Status: ${campaign.status}`);
		doc.moveDown();
	});

	doc.end();
};

const exportCharityToPDF = async (report, res) => {
	const doc = createPDFDocument();
	res.setHeader(
		"Content-Disposition",
		'attachment; filename="charity_report.pdf"',
	);
	res.setHeader("Content-Type", "application/pdf");
	doc.pipe(res);

	doc.fontSize(18).text("Charity Report", { align: "center" });
	doc.moveDown();

	report.forEach((charity) => {
		doc.fontSize(12).text(`Name: ${charity.title}`);
		doc.text(`Number of Campaigns: ${charity.campaignCount}`);
		doc.text(`Total Fundraised: ${charity.totalFundraised}`);
		doc.text(`Total Distributed: ${charity.totalDistributed}`);
		doc.text(`Average Rating: ${charity.averageRating}`);
		doc.moveDown();
	});

	doc.end();
};

const exportDonationToPDF = async (report, res) => {
	const doc = createPDFDocument();
	res.setHeader(
		"Content-Disposition",
		'attachment; filename="donation_report.pdf"',
	);
	res.setHeader("Content-Type", "application/pdf");
	doc.pipe(res);

	doc.fontSize(18).text("Donation Report", { align: "center" });
	doc.moveDown();

	report.forEach((donor) => {
		doc.fontSize(12).text(`Donor ID: ${donor.id}`);
		doc.text(`Name: ${donor.fullName}`);
		doc.text(`Number of Campaigns: ${donor.campaignCount}`);
		doc.text(`Total Donated: ${donor.totalDonated}`);
		doc.text(`Last Donation Date: ${donor.lastDonationDate}`);
		doc.moveDown();
	});

	doc.end();
};

const exportDistributionToPDF = async (report, res) => {
	const doc = createPDFDocument();
	res.setHeader(
		"Content-Disposition",
		'attachment; filename="distribution_report.pdf"',
	);
	res.setHeader("Content-Type", "application/pdf");
	doc.pipe(res);

	doc.fontSize(18).text("Distribution Report", { align: "center" });
	doc.moveDown();

	report.forEach((campaign) => {
		doc.fontSize(14).text(`Campaign: ${campaign.campaignName}`);
		campaign.distributions.forEach((distribution) => {
			doc.fontSize(12).text(`Distribution Name: ${distribution.title}`);
			doc.text(`Representative: ${distribution.representativeName}`);
			doc.text(`Budget Used: ${distribution.budget}`);
			doc.text(`Beneficiary Count: ${distribution.beneficiary_count}`);
			doc.text(`Relief Date: ${distribution.relief_date}`);
			doc.text(`Location: ${distribution.location}`);
			doc.moveDown();
		});
		doc.moveDown();
	});

	doc.end();
};
// Excel Export Functions

const exportCampaignToExcel = async (report, res) => {
	const workbook = new ExcelJS.Workbook();
	const worksheet = workbook.addWorksheet("Campaign Report");

	worksheet.columns = [
		{ header: "Title", key: "title", width: 30 },
		{ header: "Total Received", key: "totalReceived", width: 20 },
		{ header: "Total Distributed", key: "totalDistributed", width: 20 },
		{ header: "Number of Donors", key: "donorCount", width: 20 },
		{ header: "Number of Distributions", key: "distributionCount", width: 25 },
		{ header: "Status", key: "status", width: 15 },
	];

	report.forEach((campaign) => {
		worksheet.addRow(campaign);
	});

	res.setHeader(
		"Content-Disposition",
		'attachment; filename="campaign_report.xlsx"',
	);
	res.setHeader(
		"Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	);

	await workbook.xlsx.write(res);
	res.end();
};

const exportCharityToExcel = async (report, res) => {
	const workbook = new ExcelJS.Workbook();
	const worksheet = workbook.addWorksheet("Charity Report");

	worksheet.columns = [
		{ header: "Name", key: "title", width: 30 },
		{ header: "Number of Campaigns", key: "campaignCount", width: 20 },
		{ header: "Total Fundraised", key: "totalFundraised", width: 20 },
		{ header: "Total Distributed", key: "totalDistributed", width: 20 },
		{ header: "Average Rating", key: "averageRating", width: 15 },
	];

	report.forEach((charity) => {
		worksheet.addRow(charity);
	});

	res.setHeader(
		"Content-Disposition",
		'attachment; filename="charity_report.xlsx"',
	);
	res.setHeader(
		"Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	);

	await workbook.xlsx.write(res);
	res.end();
};

const exportDonationToExcel = async (report, res) => {
	const workbook = new ExcelJS.Workbook();
	const worksheet = workbook.addWorksheet("Donation Report");

	worksheet.columns = [
		{ header: "Donor ID", key: "id", width: 15 },
		{ header: "Name", key: "fullName", width: 25 },
		{ header: "Number of Campaigns", key: "campaignCount", width: 20 },
		{ header: "Total Donated", key: "totalDonated", width: 20 },
		{ header: "Last Donation Date", key: "lastDonationDate", width: 25 },
	];

	report.forEach((donor) => {
		worksheet.addRow(donor);
	});

	res.setHeader(
		"Content-Disposition",
		'attachment; filename="donation_report.xlsx"',
	);
	res.setHeader(
		"Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	);

	await workbook.xlsx.write(res);
	res.end();
};

const exportDistributionToExcel = async (report, res) => {
	const workbook = new ExcelJS.Workbook();
	const worksheet = workbook.addWorksheet("Distribution Report");

	worksheet.columns = [
		{ header: "Campaign Name", key: "campaignName", width: 30 },
		{ header: "Distribution Name", key: "title", width: 30 },
		{ header: "Representative Name", key: "representativeName", width: 25 },
		{ header: "Budget Used", key: "budget", width: 20 },
		{ header: "Beneficiary Count", key: "beneficiaryCount", width: 20 },
		{ header: "Relief Date", key: "reliefDate", width: 20 },
		{ header: "Location", key: "location", width: 30 },
	];

	report.forEach((campaign) => {
		campaign.distributions.forEach((distribution) => {
			worksheet.addRow({
				campaignName: campaign.campaignName,
				title: distribution.title,
				representativeName: distribution.representativeName,
				budget: distribution.budget,
				beneficiaryCount: distribution.beneficiary_count,
				reliefDate: distribution.relief_date,
				location: distribution.location,
			});
		});
	});

	res.setHeader(
		"Content-Disposition",
		'attachment; filename="distribution_report.xlsx"',
	);
	res.setHeader(
		"Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	);

	await workbook.xlsx.write(res);
	res.end();
};
