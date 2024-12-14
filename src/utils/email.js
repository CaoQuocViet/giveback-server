const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_HOST_USER,
    pass: process.env.EMAIL_HOST_PASSWORD
  }
});

exports.sendResetPasswordEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.DEFAULT_FROM_EMAIL,
    to: email,
    subject: 'Khôi phục mật khẩu GiveBack',
    html: `
      <h2>Yêu cầu khôi phục mật khẩu</h2>
      <p>Mã xác thực của bạn là: <strong>${otp}</strong></p>
      <p>Mã này sẽ hết hạn sau 15 phút.</p>
      <p>Nếu bạn không yêu cầu khôi phục mật khẩu, vui lòng bỏ qua email này.</p>
    `
  };

  await transporter.sendMail(mailOptions);
}; 