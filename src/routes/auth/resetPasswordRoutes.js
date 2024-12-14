const router = require('express').Router();
const {
  requestPasswordReset,
  verifyResetToken,
  resetPassword
} = require('../../controllers/auth/resetPasswordController');

router.post('/request', requestPasswordReset);
router.post('/verify', verifyResetToken);
router.post('/reset', resetPassword);

module.exports = router; 