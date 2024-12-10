const express = require("express");
const dotenv = require("dotenv");
const cors = require("./middlewares/cors");
const authRoutes = require("./routes/authRoutes");
const { connectPostgres } = require('./database/postgresConnect');
const models = require('./database/models');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors);

const PORT = process.env.PORT || 5000;

// Kết nối database
await connectPostgres();

app.get("/", (req, res) => {
	res.send("Server is running");
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	console.log(`http://localhost:${PORT}`);
});
