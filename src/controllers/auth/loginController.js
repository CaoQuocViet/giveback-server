const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const formatPhoneNumber = (phone) => {
	if (phone.startsWith('84')) {
		return '0' + phone.slice(2);
	}
	return phone;
};

const login = async (req, res) => {
	try {
		const { identifier, password, type } = req.body;
		const baseUrl = `${req.protocol}://${req.get('host')}`;

		let whereClause;
		if (type === "email") {
			whereClause = { email: identifier };
		} else {
			const formattedPhone = formatPhoneNumber(identifier);
			whereClause = { phone: formattedPhone };
		}

		const user = await User.findOne({
			where: whereClause,
			attributes: [
				"id",
				"email",
				"phone",
				"password",
				"fullName",
				"role",
				"profileImage",
				["otp_verified", "otpVerified"],
			],
		});

		console.log("User found:", user ? user.toJSON() : null); // Debug

		if (!user) {
			return res.status(400).json({
				success: false,
				error: "Email/Số điện thoại hoặc mật khẩu không chính xác",
			});
		}

		const isValidPassword = await bcrypt.compare(password, user.password);
		console.log("Password valid:", isValidPassword); // Debug

		if (!isValidPassword) {
			return res.status(400).json({
				success: false,
				error: "Email/Số điện thoại hoặc mật khẩu không chính xác",
			});
		}

		console.log("OTP verified status:", user.otpVerified); // Debug
		console.log("OTP verified type:", typeof user.otpVerified); // Debug

		if (!user.otpVerified) {
			return res.status(400).json({
				success: false,
				error: "Tài khoản chưa xác thực OTP",
			});
		}

		const token = jwt.sign(
			{
				id: user.id,
				email: user.email,
				role: user.role,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "24h" },
		);

		const userResponse = {
			token: token,
			id: user.id,
			email: user.email,
			phone: user.phone,
			fullName: user.fullName,
			role: user.role,
			profileImage: user.profileImage ? `${baseUrl}/storage/${user.profileImage}` : null,
		};

		return res.status(200).json({
			success: true,
			message: "Đăng nhập thành công",
			data: {
				token,
				user: userResponse
			},
		});
	} catch (error) {
		console.error("Login error:", error);
		return res.status(500).json({
			success: false,
			error: "Đã có lỗi xảy ra khi đăng nhập",
		});
	}
};

module.exports = {
	login,
};
