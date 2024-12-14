exports.authorizeCharity = (req, res, next) => {
  if (req.user && req.user.role === 'CHARITY') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Không có quyền truy cập'
    });
  }
}; 