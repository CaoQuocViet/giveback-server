import pool from "../config/postgresConfig.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
	try {
		const { email, password, phoneNumber, hoTen } = req.body;

		const existingUserQuery = 'SELECT * FROM "nguoidung" WHERE email = $1';
		const existingUser = await pool.query(existingUserQuery, [email]);

		if (existingUser.rows.length > 0) {
			return res.status(400).json({ error: "Email đã được sử dụng" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const { v4: uuidv4 } = await import("uuid");
		const userId = uuidv4();

		// Lưu user mới vào database
		const insertUserQuery = `
      INSERT INTO "nguoidung" (id, ho_ten, email, so_dien_thoai, mat_khau, vai_tro)
      VALUES ($1, $2, $3, $4, $5, 'NGUOIDONGGOP')
    `;
		await pool.query(insertUserQuery, [
			userId,
			hoTen,
			email,
			phoneNumber,
			hashedPassword,
		]);

		return res
			.status(201)
			.json({ success: true, message: "Đăng ký thành công" });
	} catch (error) {
		console.error("Registration error:", error);
		return res.status(500).json({ error: "Đăng ký thất bại" });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const userQuery = 'SELECT * FROM "nguoidung" WHERE email = $1';
		const userResult = await pool.query(userQuery, [email]);

		if (userResult.rows.length === 0) {
			return res
				.status(400)
				.json({ error: "Email hoặc mật khẩu không chính xác" });
		}

		const user = userResult.rows[0];

		const isMatch = await bcrypt.compare(password, user.mat_khau);
		if (!isMatch) {
			return res
				.status(400)
				.json({ error: "Email hoặc mật khẩu không chính xác" });
		}

		const jwt = (await import("jsonwebtoken")).default;
		const token = jwt.sign(
			{ id: user.id, email: user.email, vaiTro: user.vai_tro },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" },
		);

		return res.json({ success: true, token });
	} catch (error) {
		console.error("Login error:", error);
		return res.status(500).json({ error: "Đăng nhập thất bại" });
	}
};
