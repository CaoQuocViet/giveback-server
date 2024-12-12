const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

module.exports = {
	development: {
		username: process.env.DB_USER || "vietcq",
		password: process.env.DB_PASSWORD || "123456789000",
		database: process.env.DB_NAME || "giveback_db",
		host: process.env.DB_HOST || "localhost",
		port: process.env.DB_PORT || 5432,
		dialect: "postgres",
		dialectOptions: {
			timezone: "Asia/Ho_Chi_Minh",
		},
		define: {
			timestamps: true,
			underscored: true,
		},
	},
	test: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: "postgres",
	},
	production: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: "postgres",
		logging: false,
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
};
