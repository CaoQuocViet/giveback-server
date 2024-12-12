const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const administrativeRoutes = require("./routes/administrative.routes");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const statisticsRoutes = require("./routes/statistics.routes");
const charitiesRoutes = require("./routes/charities.routes");
const reportsRoutes = require("./routes/reports.routes");
const campaignRoutes = require('./routes/campaigns.route');
const app = express();
app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:3000",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	}),
);
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.send("Server is running");
});

// Thêm route administrative
app.use("/api/administrative", administrativeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/statistics", statisticsRoutes);
app.use("/api/charities", charitiesRoutes);
app.use("/api/reports", reportsRoutes);
app.use('/api/campaigns', campaignRoutes);


app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	console.log(`http://localhost:${PORT}`);
});
