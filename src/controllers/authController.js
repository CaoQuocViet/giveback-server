const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const register = async (req, res) => {
	try {
		const { email, password, phoneNumber, hoTen } = req.body;

		// Kiểm tra email đã tồn tại
		const existingUser = await User.findOne({ where: { email } });
		if (existingUser) {
			return res.status(400).json({ error: "Email đã được sử dụng" });
		}

		// Tạo user mới
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			id: uuidv4(),
			full_name: hoTen,
			email,
			phone: phoneNumber,
			password: hashedPassword,
			role: 'DONOR',
			otp_verified: false
		});

		return res.status(201).json({ 
			success: true, 
			message: "Đăng ký thành công" 
		});

	} catch (error) {
		console.error("Registration error:", error);
		return res.status(500).json({ error: "Đăng ký thất bại" });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Tìm user theo email
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return res.status(400).json({ 
				error: "Email hoặc mật khẩu không chính xác" 
			});
		}

		// Kiểm tra mật khẩu
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ 
				error: "Email hoặc mật khẩu không chính xác" 
			});
		}

		// Tạo JWT token
		const token = jwt.sign(
			{ 
				id: user.id, 
				email: user.email, 
				role: user.role 
			},
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		return res.json({ 
			success: true, 
			token,
			user: {
				id: user.id,
				full_name: user.full_name,
				email: user.email,
				role: user.role
			}
		});

	} catch (error) {
		console.error("Login error:", error);
		return res.status(500).json({ error: "Đăng nhập thất bại" });
	}
};

module.exports = {
	register,
	login
};
