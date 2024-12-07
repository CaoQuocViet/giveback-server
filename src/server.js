import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 1000;

app.get("/", (req, res) => {
	res.send("Server is running");
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	console.log(`http://localhost:${PORT}`);
});
