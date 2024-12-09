# Authentication Routes

## Mục đích
- Xử lý đăng ký tài khoản mới
- Xác thực người dùng qua OTP
- Đăng nhập/đăng xuất
- Quên mật khẩu và reset password

## Routes

### POST /api/auth/register
Đăng ký tài khoản mới

Request Body:
- email: string (required) - Email đăng ký
- password: string (required) - Mật khẩu
- confirm_password: string (required) - Xác nhận mật khẩu  
- full_name: string (required) - Họ tên
- phone: string (required) - Số điện thoại
- role: enum (required) - DONOR | CHARITY | BENEFICIARY
- province: string (required) - Tỉnh/Thành
- district: string (required) - Quận/Huyện
- ward: string (required) - Phường/Xã
- address: string (required) - Địa chỉ cụ thể

Thêm cho CHARITY:
- title: string (required) - Tên tổ chức
- description: text (required) - Mô tả
- license_number: string (required) - Số giấy phép
- license_date: date (required) - Ngày cấp
- license_issuer: string (required) - Cơ quan cấp
- license_image: File (required) - Ảnh giấy phép

Response Success:
{
  "success": true,
  "message": "Đăng ký thành công",
  "data": {
    "id": "uuid",
    "email": "string",
    "phone": "string"
  }
}

### POST /api/auth/verify-otp
Xác thực OTP

Request Body:
- phone: string (required) - Số điện thoại
- code: string (required) - Mã OTP (6 số)

Response Success:
{
  "success": true,
  "message": "Xác thực thành công"
}

### POST /api/auth/login 
Đăng nhập

Request Body:
- username: string (required) - Email hoặc số điện thoại
- password: string (required) - Mật khẩu

Response Success:
{
  "success": true,
  "message": "Đăng nhập thành công",
  "data": {
    "token": "JWT token",
    "user": {
      "id": "uuid",
      "email": "string",
      "role": "enum",
      "full_name": "string"
    }
  }
}

### POST /api/auth/logout
Đăng xuất (yêu cầu token)

Headers:
- Authorization: Bearer <token>

Response Success:
{
  "success": true,
  "message": "Đăng xuất thành công"
}

### POST /api/auth/forgot-password
Yêu cầu reset password

Request Body:
- email: string (required) - Email đăng ký

Response Success:
{
  "success": true,
  "message": "Đã gửi link reset password"
}

### POST /api/auth/reset-password
Reset password với token

Request Body:
- token: string (required) - Token từ email
- password: string (required) - Mật khẩu mới
- confirm_password: string (required) - Xác nhận mật khẩu

Response Success:
{
  "success": true,
  "message": "Đổi mật khẩu thành công"
}

## Error Responses (4xx/5xx)
{
  "success": false,
  "message": "Mô tả lỗi",
  "error": "Chi tiết lỗi"
}

## Validation Rules
- Email: Đúng định dạng, chưa được sử dụng
- Phone: 10 số, chưa được sử dụng
- Password: Ít nhất 8 ký tự, có chữ hoa, chữ thường và số
- OTP: 6 số, hết hạn sau 5 phút
- Reset token: Hết hạn sau 30 phút

## Notes
- OTP được gửi qua SMS
- Reset password link được gửi qua email
- Token JWT hết hạn sau 24h
- Giới hạn số lần gửi OTP và reset password