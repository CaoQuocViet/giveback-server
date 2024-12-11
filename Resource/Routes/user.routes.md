# User Routes

## Mục đích
- Quản lý thông tin cá nhân
- Xem thống kê và báo cáo cá nhân

## Routes

### GET /api/users/profile
Xem thông tin cá nhân

Headers:
- Authorization: Bearer <token>

Response Success:
{
  "success": true,
  "data": {
    "id": "uuid",
    "full_name": "Nguyễn Văn A",
    "email": "email@domain.com",
    "phone": "0123456789",
    "profile_image": "URL",
    "role": "DONOR|CHARITY",
    "created_at": "2024-03-20T00:00:00Z",
    "updated_at": "2024-03-20T00:00:00Z",
    "charity": {  // Nếu role=CHARITY
      "id": "uuid",
      "title": "Tên tổ chức",
      "description": "Mô tả",
      "verification_status": "VERIFIED",
      "license_number": "123456",
      "license_date": "2024-01-01",
      "license_issuer": "Sở KH&ĐT",
      "province": "Tỉnh/Thành",
      "district": "Quận/Huyện",
      "ward": "Phường/Xã",
      "address": "Địa chỉ cụ thể"
    }
  }
}

### PUT /api/users/profile
Cập nhật thông tin cá nhân

Headers:
- Authorization: Bearer <token>

Request Body:
- full_name: string - Họ tên
- phone: string - Số điện thoại
- profile_image: string - URL ảnh đại diện
- current_password: string - Mật khẩu hiện tại (bắt buộc khi đổi mật khẩu)
- new_password: string - Mật khẩu mới
- new_password_confirmation: string - Xác nhận mật khẩu mới

Response Success:
{
  "success": true,
  "message": "Cập nhật thông tin thành công"
}

### GET /api/users/statistics
Xem thống kê cá nhân

Headers:
- Authorization: Bearer <token>

Query Parameters:
- from_date: date - Từ ngày
- to_date: date - Đến ngày
- type: string - Loại thống kê (daily|monthly|yearly)

Response Success:
{
  "success": true,
  "data": {
    "total_donated": number,
    "total_campaigns": number,
    "total_comments": number,
    "donation_chart": [{
      "date": "2024-03",
      "amount": number
    }],
    "category_stats": [{
      "category": string,
      "amount": number,
      "count": number
    }],
    "recent_activities": [{
      "type": "DONATION|COMMENT|RATING",
      "campaign_id": "uuid",
      "campaign_title": string,
      "amount": number,
      "created_at": datetime
    }]
  }
}

### GET /api/users/reports
Xem báo cáo tổng quan

Headers:
- Authorization: Bearer <token>

Query Parameters:
- type: string - Loại báo cáo (donations|activities)
- format: string - Định dạng xuất (pdf|excel)
- from_date: date - Từ ngày
- to_date: date - Đến ngày

Response Success:
{
  "success": true,
  "data": {
    "file_url": "URL file báo cáo",
    "expires_at": "2024-03-21T00:00:00Z"
  }
}

### GET /api/users/campaigns/:id/report
Xem báo cáo chi tiết chiến dịch

Headers:
- Authorization: Bearer <token>

Parameters:
- id: string - ID chiến dịch

Query Parameters:
- format: string - Định dạng xuất (pdf|excel)

Response Success:
{
  "success": true,
  "data": {
    "campaign": {
      "id": "uuid",
      "title": string,
      "charity_name": string,
      "status": string,
      "start_date": date,
      "end_date": date
    },
    "donations": [{
      "id": "uuid",
      "amount": number,
      "payment_method": string,
      "status": string,
      "message": string,
      "created_at": datetime
    }],
    "activities": [{
      "type": "COMMENT|RATING",
      "content": string,
      "rating": number,
      "created_at": datetime
    }],
    "file_url": "URL file báo cáo",
    "expires_at": "2024-03-21T00:00:00Z"
  }
}

## Error Responses (4xx/5xx)
{
  "success": false,
  "message": "Mô tả lỗi",
  "error": "Chi tiết lỗi"
}

## Validation Rules
- Email không thể thay đổi sau khi đăng ký
- Số điện thoại phải là số Việt Nam hợp lệ
- Mật khẩu mới phải khác mật khẩu hiện tại
- Mật khẩu ít nhất 8 ký tự
- URL ảnh phải hợp lệ
- File báo cáo có hiệu lực trong 24h

## Notes
- Cache thông tin user để tối ưu hiệu năng
- Thống kê được cache và cập nhật mỗi giờ
- Báo cáo có thể xuất PDF hoặc Excel
- Nén file báo cáo nếu > 10MB
- Lưu log mọi thao tác quan trọng