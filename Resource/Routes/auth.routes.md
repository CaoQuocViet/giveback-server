# Authentication Routes

## Mục đích
- Đăng ký và xác thực người dùng
- Quản lý phiên đăng nhập
- Xử lý quên/đặt lại mật khẩu
- Xác thực OTP

## Routes

### POST /api/auth/register
Đăng ký tài khoản mới

Request Body:
- full_name: string (required) - Họ tên
- email: string (required) - Email đăng ký
- phone: string (required) - Số điện thoại
- password: string (required) - Mật khẩu (min: 8 ký tự)
- role: enum (required) - Loại tài khoản (DONOR|CHARITY)
- profile_image: string - URL ảnh đại diện

Charity Required Fields:
- title: string - Tên tổ chức
- description: text - Mô tả tổ chức
- license_number: string - Số giấy phép
- license_date: date - Ngày cấp
- license_issuer: string - Đơn vị cấp phép
- license_image_url: string - URL ảnh giấy phép
- province: string - Tỉnh/thành
- district: string - Quận/huyện
- ward: string - Phường/xã
- address: string - Địa chỉ cụ thể

Response Success:
{
  "success": true,
  "message": "Đăng ký thành công. Vui lòng xác thực OTP",
  "data": {
    "user_id": "uuid",
    "email": "email@domain.com"
  }
}

### POST /api/auth/login
Đăng nhập

Request Body:
- email: string (required) - Email đăng nhập
- password: string (required) - Mật khẩu
- remember_me: boolean - Ghi nhớ đăng nhập

Response Success:
{
  "success": true,
  "data": {
    "access_token": "JWT token",
    "refresh_token": "Refresh token",
    "expires_in": 3600,
    "user": {
      "id": "uuid",
      "full_name": string,
      "email": string,
      "phone": string,
      "role": enum(ADMIN|DONOR|CHARITY),
      "profile_image": string,
      "is_verified": boolean,
      "created_at": datetime
    }
  }
}

### POST /api/auth/logout
Đăng xuất

Headers:
- Authorization: Bearer <token>

Response Success:
{
  "success": true,
  "message": "Đăng xuất thành công"
}

### POST /api/auth/verify-otp
Xác thực OTP

Request Body:
- email: string (required) - Email đăng ký
- otp: string (required) - Mã OTP (6 số)

Response Success:
{
  "success": true,
  "message": "Xác thực thành công",
  "data": {
    "access_token": "JWT token"
  }
}

### POST /api/auth/resend-otp
Gửi lại mã OTP

Request Body:
- email: string (required) - Email đăng ký

Response Success:
{
  "success": true,
  "message": "Đã gửi lại mã OTP"
}

### POST /api/auth/forgot-password
Quên mật khẩu

Request Body:
- email: string (required) - Email đăng ký

Response Success:
{
  "success": true,
  "message": "Đã gửi link đặt lại mật khẩu qua email"
}

### POST /api/auth/reset-password
Đặt lại mật khẩu

Request Body:
- token: string (required) - Token từ email
- password: string (required) - Mật khẩu mới
- password_confirmation: string (required) - Xác nhận mật khẩu

Response Success:
{
  "success": true,
  "message": "Đặt lại mật khẩu thành công"
}

## Error Responses (4xx/5xx)
{
  "success": false,
  "message": "Mô tả lỗi",
  "error": "Chi tiết lỗi"
}

## Validation Rules
- Email phải là email hợp lệ và chưa được sử dụng
- Số điện thoại phải là số Việt Nam hợp lệ
- Mật khẩu ít nhất 8 ký tự
- OTP có 6 chữ số và chỉ có hiệu lực trong 5 phút
- Token reset password chỉ có hiệu lực trong 30 phút
- Giới hạn số lần gửi lại OTP: 3 lần/email/ngày
- Giới hạn số lần reset password: 3 lần/email/ngày