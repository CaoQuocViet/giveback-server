const bcrypt = require('bcryptjs');

/**
 * Tạo mã OTP ngẫu nhiên với độ dài cho trước
 * @param {number} length - Độ dài của mã OTP
 * @returns {string} Mã OTP
 */
exports.generateToken = (length = 6) => {
  const digits = '0123456789';
  let otp = '';
  
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  
  return otp;
};

/**
 * Hash mật khẩu sử dụng bcrypt
 * @param {string} password - Mật khẩu cần hash
 * @returns {Promise<string>} Mật khẩu đã được hash
 */
exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

/**
 * So sánh mật khẩu với hash
 * @param {string} password - Mật khẩu cần kiểm tra
 * @param {string} hashedPassword - Hash của mật khẩu
 * @returns {Promise<boolean>} Kết quả so sánh
 */
exports.comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
}; 