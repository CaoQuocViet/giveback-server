const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.authenticateToken = async (req, res, next) => {
  try {
    // Lấy token từ header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Không tìm thấy token xác thực'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Tìm user từ decoded token
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Người dùng không tồn tại'
      });
    }

    // Gán thông tin user vào request
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      charityId: user.role === 'CHARITY' ? user.id : null // User.id chính là Charity.id
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token không hợp lệ'
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token đã hết hạn'
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Lỗi xác thực'
    });
  }
}; 