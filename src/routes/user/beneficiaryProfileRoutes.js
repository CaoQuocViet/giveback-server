const router = require('express').Router();
const { getBeneficiaryProfile, updateBeneficiaryProfile } = require('../../controllers/user/beneficiaryProfileController');
const { authMiddleware } = require('../../middleware/auth');
const multer = require('multer');

// Cấu hình multer để xử lý multipart/form-data
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024 // Giới hạn 20MB
  }
});

router.get('/', authMiddleware, getBeneficiaryProfile);
router.put('/', authMiddleware, upload.single('profileImage'), updateBeneficiaryProfile);

module.exports = router; 