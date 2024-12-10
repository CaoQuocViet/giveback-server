const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
// const routes = require("./routes"); // Tạm comment lại

const app = express();
app.use(express.json());
app.use(cors());  // Sửa lại từ app.use(cors) thành app.use(cors())
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.send("Server is running");
});

// Tạm comment lại route auth
// app.use("/api/auth", routes.authRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	console.log(`http://localhost:${PORT}`);
});
