const router = require('express').Router();
const charityProfileController = require('../../controllers/user/charityProfileController');
const { authMiddleware } = require('../../middleware/auth');
const multer = require('multer');

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

module.exports = router; 