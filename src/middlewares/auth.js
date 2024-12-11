const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Không có token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Lưu thông tin user vào request
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token không hợp lệ' });
  }
};

module.exports = {
  authMiddleware
}; 