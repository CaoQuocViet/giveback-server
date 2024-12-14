const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const path = require("path");
const { STORAGE_PATH } = require("./utils/fileUpload");
const administrativeRoutes = require("./routes/administrative.routes");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const statisticsRoutes = require("./routes/statistics.routes");
const charitiesRoutes = require("./routes/charities.routes");
const reportsRoutes = require("./routes/reports.routes");
const campaignRoutes = require("./routes/campaigns.routes");
const campaignDetailRoute = require("./routes/campaign.detail.routes");
const commentsRoutes = require("./routes/comments.routes");
const donorProfileRoutes = require('./routes/user/donorProfileRoutes');
const charityProfileRoutes = require('./routes/user/charityProfileRoutes');
const adminProfileRoutes = require('./routes/user/adminProfileRoutes');
const beneficiaryProfileRoutes = require('./routes/user/beneficiaryProfileRoutes');
const donorDonationHistoryRoutes = require('./routes/user/donorDonationHistoryRoutes');
const resetPasswordRoutes = require('./routes/auth/resetPasswordRoutes');
const charityRoutes = require('./routes/charity');

const app = express();
app.use(express.json());
app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:3000",
			methods: ["GET", "POST", "PUT", "DELETE"],
			credentials: true,
	}),
);
app.use(morgan("dev"));
app.use(helmet({
	crossOriginResourcePolicy: false
}));
app.use(compression());
app.use(express.urlencoded({ extended: true }));

app.use('/storage', express.static(STORAGE_PATH));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.send("Server is running");
});

// Thêm route
app.use("/api/administrative", administrativeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/statistics", statisticsRoutes);
app.use("/api/charities", charitiesRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/campaigns/detail", campaignDetailRoute);
app.use("/api/campaigns/:id/comments", commentsRoutes);
app.use('/api/profile/donor', donorProfileRoutes);
app.use('/api/profile/charity', charityProfileRoutes);
app.use('/api/profile/admin', adminProfileRoutes);
app.use('/api/profile/beneficiary', beneficiaryProfileRoutes);
app.use('/api/donor/donations', donorDonationHistoryRoutes);
app.use("/api/auth/reset-password", resetPasswordRoutes);
app.use('/api/charities', charityRoutes);
app.use('/api/charity', charityRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	console.log(`http://localhost:${PORT}`);
});
