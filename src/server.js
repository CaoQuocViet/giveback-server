import express from "express";
import dotenv from "dotenv";
import cors from "./middlewares/cors.js";
import authRoutes from "./routes/authRoutes.js";
import { connectPostgres } from './database/postgresConnect.js';
import models from './database/models.js';

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
