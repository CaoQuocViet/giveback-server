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

	doc.fontSize(18).text("Báo cáo theo chiến dịch", { align: "center" });
	doc.moveDown();

	report.forEach((campaign) => {
		doc.fontSize(12).text(`Tên chiến dịch: ${campaign.title}`);
		doc.text(`Số tiền nhận: ${campaign.totalReceived}`);
		doc.text(`Số tiền phân phối: ${campaign.totalDistributed}`);
		doc.text(`Số người đóng góp: ${campaign.donorCount}`);
		doc.text(`Số đợt hỗ trợ: ${campaign.distributionCount}`);
		doc.text(`Trạng thái: ${campaign.status}`);
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

	doc.fontSize(18).text("Báo cáo theo tổ chức", { align: "center" });
	doc.moveDown();

	report.forEach((charity) => {
		doc.fontSize(12).text(`Tên tổ chức: ${charity.title}`);
		doc.text(`Số chiến dịch: ${charity.campaignCount}`);
		doc.text(`Tổng tiền gây quỹ: ${charity.totalFundraised}`);
		doc.text(`Tổng tiền đã phân phối: ${charity.totalDistributed}`);
		doc.text(`Đánh giá trung bình: ${charity.averageRating}`);
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

	doc.fontSize(18).text("Báo cáo theo người đóng góp", { align: "center" });
	doc.moveDown();

	report.forEach((donor) => {
		doc.fontSize(12).text(`ID: ${donor.id}`);
		doc.text(`Tên: ${donor.fullName}`);
		doc.text(`Số chiến dịch: ${donor.campaignCount}`);
		doc.text(`Tổng số tiền: ${donor.totalDonated}`);
		doc.text(`Lần đóng góp gần nhất: ${donor.lastDonationDate}`);
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

	doc.fontSize(18).text("Báo cáo theo đợt hỗ trợ", { align: "center" });
	doc.moveDown();

	report.forEach((campaign) => {
		doc.fontSize(14).text(`Chiến dịch: ${campaign.campaignName}`);
		campaign.distributions.forEach((distribution) => {
			doc.fontSize(12).text(`Tên đợt hỗ trợ: ${distribution.title}`);
			doc.text(`Người đại diện: ${distribution.representativeName}`);
			doc.text(`Ngân sách sử dụng: ${distribution.budget}`);
			doc.text(`Số người được hỗ trợ: ${distribution.beneficiary_count}`);
			doc.text(`Ngày hỗ trợ: ${distribution.relief_date}`);
			doc.text(`Địa điểm: ${distribution.location}`);
			doc.moveDown();
		});
		doc.moveDown();
	});

	doc.end();
};
// Excel Export Functions

const exportCampaignToExcel = async (report, res) => {
	const workbook = new ExcelJS.Workbook();
	const worksheet = workbook.addWorksheet("Báo cáo theo chiến dịch");

	worksheet.columns = [
		{ header: "Tên chiến dịch", key: "title", width: 30 },
		{ header: "Trạng thái", key: "status", width: 15 },
		{ header: "Tổng tiền nhận", key: "totalReceived", width: 20 },
		{ header: "Tổng tiền phân phối", key: "totalDistributed", width: 20 },
		{ header: "Số người đóng góp", key: "donorCount", width: 20 },
		{ header: "Số đợt hỗ trợ", key: "distributionCount", width: 20 },
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
	const worksheet = workbook.addWorksheet("Báo cáo theo tổ chức");

	worksheet.columns = [
		{ header: "Tên tổ chức", key: "title", width: 30 },
		{ header: "Số chiến dịch", key: "campaignCount", width: 15 },
		{ header: "Tổng tiền gây quỹ", key: "totalFundraised", width: 20 },
		{ header: "Tổng tiền đã phân phối", key: "totalDistributed", width: 20 },
		{ header: "Đánh giá trung bình", key: "averageRating", width: 20 },
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
	const worksheet = workbook.addWorksheet("Báo cáo theo người đóng góp");

	worksheet.columns = [
		{ header: "Người đóng góp", key: "full_name", width: 30 },
		{ header: "Số chiến dịch đã đóng góp", key: "campaignCount", width: 25 },
		{ header: "Tổng số tiền", key: "totalDonated", width: 20 },
		{ header: "Lần đóng góp gần nhất", key: "lastDonationDate", width: 25 },
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
	const worksheet = workbook.addWorksheet("Báo cáo theo đợt hỗ trợ");

	worksheet.columns = [
		{ header: "Tên chiến dịch", key: "campaignName", width: 30 },
		{ header: "Tên đợt hỗ trợ", key: "title", width: 30 },
		{ header: "Người đại diện", key: "representativeName", width: 25 },
		{ header: "Ngân sách sử dụng", key: "budget", width: 20 },
		{ header: "Số người được hỗ trợ", key: "beneficiaryCount", width: 20 },
		{ header: "Ngày hỗ trợ", key: "reliefDate", width: 20 },
		{ header: "Địa điểm", key: "location", width: 30 },
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

const exportReport = async (type, format) => {
	const reportTemplates = {
		campaign: {
			fields: [
				{ header: 'Tên chiến dịch', key: 'title' },
				{ header: 'Tổ chức', key: 'charity_name' },
				{ header: 'Trạng thái', key: 'status', 
					format: (value) => ({
						'STARTING': 'Chuẩn bị',
						'ONGOING': 'Đang diễn ra',
						'COMPLETED': 'Hoàn thành',
						'CLOSED': 'Đã đóng'
					})[value] || value
				},
				{ header: 'Tổng tiền nhận', key: 'totalReceived',
					format: (value) => new Intl.NumberFormat('vi-VN', {
						style: 'currency',
						currency: 'VND'
					}).format(value)
				},
				{ header: 'Số người đóng góp', key: 'donorCount' },
				{ header: 'Số đợt hỗ trợ', key: 'distributionCount' }
			]
		},
		charity: {
			fields: [
				{ header: 'Tên tổ chức', key: 'title' },
				{ header: 'Số chiến dịch', key: 'campaignCount' },
				{ header: 'Tổng tiền gây quỹ', key: 'totalFundraised',
					format: (value) => new Intl.NumberFormat('vi-VN', {
						style: 'currency',
						currency: 'VND'
					}).format(value)
				},
				{ header: 'Tổng tiền đã phân phối', key: 'totalDistributed',
					format: (value) => new Intl.NumberFormat('vi-VN', {
						style: 'currency',
						currency: 'VND'
					}).format(value)
				},
				{ header: 'Đánh giá trung bình', key: 'averageRating',
					format: (value) => Number(value).toFixed(1) + ' ⭐'
				}
			]
		},
		donation: {
			fields: [
				{ header: 'Người đóng góp', key: 'fullName' },
				{ header: 'Số chiến dịch đã đóng góp', key: 'campaignCount' },
				{ header: 'Tổng số tiền', key: 'totalDonated',
					format: (value) => new Intl.NumberFormat('vi-VN', {
						style: 'currency',
						currency: 'VND'
					}).format(value)
				},
				{ header: 'Lần đóng góp gần nhất', key: 'lastDonationDate',
					format: (value) => new Date(value).toLocaleDateString('vi-VN')
				}
			]
		},
		distribution: {
			fields: [
				{ header: 'Tên chiến dịch', key: 'campaignName' },
				{ header: 'Tên đợt hỗ trợ', key: 'title' },
				{ header: 'Người đại diện', key: 'representativeName' },
				{ header: 'Ngân sách', key: 'budget',
					format: (value) => new Intl.NumberFormat('vi-VN', {
						style: 'currency',
						currency: 'VND'
					}).format(value)
				},
				{ header: 'Số người được hỗ trợ', key: 'beneficiary_count' },
				{ header: 'Ngày hỗ trợ', key: 'relief_date',
					format: (value) => new Date(value).toLocaleDateString('vi-VN')
				},
				{ header: 'Địa điểm', key: 'location' }
			]
		}
	}

	// PDF styling
	const pdfStyles = {
		header: {
			fontSize: 18,
			bold: true,
			alignment: 'center',
			margin: [0, 0, 0, 20]
		},
		table: {
			margin: [0, 5, 0, 15]
		},
		tableHeader: {
			bold: true,
			fontSize: 13,
			color: 'black',
			fillColor: '#f3f4f6'
		},
		tableCell: {
			fontSize: 12,
			padding: 8
		}
	}

	// ... rest of the export logic
}
