import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    username: process.env.DB_USER || "vietcq",
    password: process.env.DB_PASSWORD || "123456789000",
    database: process.env.DB_NAME || "giveback_db",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres"
  },
  test: {
    // test config
  },
  production: {
    // production config
  }
}; 