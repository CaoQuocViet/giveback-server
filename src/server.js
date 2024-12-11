const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const administrativeRoutes = require("./routes/administrative.routes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use(cors({
	origin: "http://localhost:3000",
	methods: ["GET", "POST", "PUT", "DELETE"],
	credentials: true
}));
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

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	console.log(`http://localhost:${PORT}`);
});
