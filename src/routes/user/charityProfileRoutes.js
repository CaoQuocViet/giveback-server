const router = require('express').Router();
const charityProfileController = require('../../controllers/user/charityProfileController');
const { authMiddleware } = require('../../middleware/auth');
const multer = require('multer');
const { uploadFile } = require('../../utils/fileUpload');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024 // 20MB limit
  }
});

const uploadFields = upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'licenseImage', maxCount: 1 }
]);

router.get('/', authMiddleware, charityProfileController.getCharityProfile);
router.put('/', authMiddleware, uploadFields, charityProfileController.updateCharityProfile);
router.post('/upload', upload.single('licenseImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Không có file được tải lên'
      });
    }

    const filePath = await uploadFile(req.file, 'charities/licenses');
    
    res.status(200).json({
      success: true,
      message: 'Tải file thành công',
      licenseImage: filePath
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tải file',
      error: error.message
    });
  }
});

module.exports = router; 