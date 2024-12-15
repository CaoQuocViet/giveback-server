/**
 * Xử lý lỗi chung cho toàn bộ ứng dụng
 * @param {Response} res - Express response object
 * @param {Error} error - Error object
 */
const handleError = (res, error) => {
  console.error('Error:', error);

  // Xử lý các loại lỗi cụ thể
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Dữ liệu không hợp lệ',
      errors: error.errors.map(err => ({
        field: err.path,
        message: err.message
      }))
    });
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      success: false,
      message: 'Dữ liệu đã tồn tại',
      errors: error.errors.map(err => ({
        field: err.path,
        message: err.message
      }))
    });
  }

  // Xử lý các lỗi khác
  return res.status(500).json({
    success: false,
    message: 'Đã có lỗi xảy ra',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
};

module.exports = {
  handleError
}; 