# User Routes

## Mục đích
- Quản lý thông tin cá nhân
- Thay đổi mật khẩu
- Xác thực OTP

## Routes

### GET /api/users/profile
Lấy thông tin cá nhân

Headers:
- Authorization: Bearer <token>

Response Success:
{
  "success": true,
  "data": {
    "id": "uuid",
    "full_name": "Nguyễn Văn A",
    "email": "email@example.com",
    "phone": "0123456789",
    "role": "DONOR",
    "profile_image": "/storage/profiles/abc.jpg",
    "province": "Hồ Chí Minh",
    "district": "Quận 1",
    "ward": "Phường Bến Nghé",
    "address": "123 Đường ABC",
    "created_at": "2024-01-01T00:00:00Z"
  }
}

### PUT /api/users/profile
Cập nhật thông tin cá nhân

Headers:
- Authorization: Bearer <token>

Request Body:
- full_name: string - Họ tên
- email: string - Email
- profile_image: File - Ảnh đại diện
- province: string - Tỉnh/Thành
- district: string - Quận/Huyện
- ward: string - Phường/Xã
- address: string - Địa chỉ cụ thể

Response Success:
{
  "success": true,
  "message": "Cập nhật thành công"
}

### PUT /api/users/password
Đổi mật khẩu

Headers:
- Authorization: Bearer <token>

Request Body:
- current_password: string (required) - Mật khẩu hiện tại
- new_password: string (required) - Mật khẩu mới
- confirm_password: string (required) - Xác nhận mật khẩu mới

Response Success:
{
  "success": true,
  "message": "Đổi mật khẩu thành công"
}

### POST /api/users/verify-otp
Xác thực OTP

Request Body:
- phone: string (required) - Số điện thoại
- otp: string (required) - Mã OTP

Response Success:
{
  "success": true,
  "message": "Xác thực thành công"
}

### POST /api/users/resend-otp
Gửi lại mã OTP

Request Body:
- phone: string (required) - Số điện thoại

Response Success:
{
  "success": true,
  "message": "Đã gửi lại mã OTP"
}

## Error Responses (4xx/5xx)
{
  "success": false,
  "message": "Mô tả lỗi",
  "error": "Chi tiết lỗi"
}

## Validation Rules
- Email phải đúng định dạng và chưa được sử dụng
- Mật khẩu mới phải khác mật khẩu hiện tại
- Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số
- OTP có 6 chữ số và chỉ có hiệu lực trong 5 phút
- Chỉ được gửi lại OTP sau 60 giây
- Ảnh đại diện: Max 2MB, định dạng jpg/png/jpeg

## Notes
- Thông tin nhạy cảm được ẩn (ví dụ: mật khẩu)
- Lưu lịch sử thay đổi thông tin quan trọng
- Giới hạn số lần nhập sai OTP (tối đa 3 lần)