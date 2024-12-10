const express = require('express');
const router = express.Router();

// Định nghĩa các routes
router.post('/register', (req, res) => {
  res.send('Register route');
});

router.post('/login', (req, res) => {
  res.send('Login route');
});

router.post('/verify-otp', (req, res) => {
  res.send('Verify OTP route');
});

router.post('/forgot-password', (req, res) => {
  res.send('Forgot password route');
});

router.post('/reset-password', (req, res) => {
  res.send('Reset password route');
});

module.exports = router;
