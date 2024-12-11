# Admin Routes

## Mục đích
- Quản lý và xác thực tổ chức từ thiện
- Xem thống kê hệ thống
- Quản lý thông tin cá nhân admin

## Routes

### GET /api/admin/charities
Xem danh sách tổ chức từ thiện

Headers:
- Authorization: Bearer <token>

Query Parameters:
- verification_status: enum (PENDING/VERIFIED/REJECTED) - Lọc theo trạng thái xác thực
- search: string - Tìm kiếm theo tên/email/phone
- province: string - Lọc theo tỉnh/thành
- district: string - Lọc theo quận/huyện
- from_date: date - Lọc từ ngày đăng ký
- to_date: date - Lọc đến ngày đăng ký
- sort_by: string (rating|total_raised|campaign_count) - Sắp xếp theo
- order: string (asc|desc) - Thứ tự sắp xếp
- page: number - Trang hiện tại
- limit: number - Số lượng/trang

Response Success:
{
  "success": true,
  "data": {
    "items": [{
      "id": "uuid",
      "title": "Tên tổ chức",
      "description": "Mô tả tổ chức",
      "email": "email@org.com",
      "phone": "0123456789",
      "verification_status": "PENDING",
      "license_number": "ABC123",
      "license_date": "2024-01-01",
      "license_issuer": "Sở LĐTBXH",
      "license_image_url": "URL",
      "province": "Tỉnh/Thành",
      "district": "Quận/Huyện",
      "ward": "Phường/Xã",
      "address": "Số nhà, đường",
      "rating": 4.5,
      "campaign_count": 10,
      "total_raised": 1000000000,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }],
    "total": 100,
    "page": 1,
    "limit": 10
  }
}

### GET /api/admin/charities/:id
Xem chi tiết tổ chức từ thiện

Headers:
- Authorization: Bearer <token>

Parameters:
- id: string - ID tổ chức

Response Success:
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Tên tổ chức",
    "description": "Mô tả",
    "email": "email@org.com",
    "phone": "0123456789",
    "profile_image": "URL",
    "verification_status": "PENDING",
    "license_description": "Mô tả giấy phép",
    "license_number": "ABC123",
    "license_date": "2024-01-01",
    "license_issuer": "Sở LĐTBXH",
    "license_image_url": "URL",
    "founding_date": "2020-01-01",
    "website": "https://org.com",
    "social_links": {
      "facebook": "URL",
      "twitter": "URL"
    },
    "merchant_id": "MERCHANT_ID",
    "merchant_name": "TÊN MERCHANT",
    "bank_account": "123456789",
    "bank_name": "VIETCOMBANK",
    "bank_branch": "HCM",
    "bank_owner": "NGUYEN VAN A",
    "payment_gateway": "VNPAY",
    "province": "Tỉnh/Thành",
    "district": "Quận/Huyện",
    "ward": "Phường/Xã",
    "address": "Số nhà, đường",
    "rating": 4.5,
    "campaign_count": 10,
    "total_raised": 1000000000,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z",
    "phone_verified_at": "2024-01-01T00:00:00Z"
  }
}

### PUT /api/admin/charities/:id/verify
Xác thực hoặc từ chối tổ chức từ thiện

Headers:
- Authorization: Bearer <token>

Parameters:
- id: string - ID tổ chức

Request Body:
- status: enum (VERIFIED/REJECTED) - Trạng thái xác thực mới
- note: string - Ghi chú/Lý do (bắt buộc nếu từ chối)

Response Success:
{
  "success": true,
  "message": "Cập nhật trạng thái xác thực thành công"
}

### GET /api/admin/statistics
Xem thống kê hệ thống

Headers:
- Authorization: Bearer <token>

Query Parameters:
- from_date: date - Thống kê từ ngày
- to_date: date - Thống kê đến ngày

Response Success:
{
  "success": true,
  "data": {
    "users": {
      "total": 1000,
      "donors": 800,
      "charities": 100,
      "beneficiaries": 100
    },
    "charities": {
      "total": 100,
      "pending": 20,
      "verified": 70,
      "rejected": 10
    },
    "campaigns": {
      "total": 200,
      "starting": 50,
      "ongoing": 100,
      "closed": 30,
      "completed": 20,
      "total_raised": 10000000000
    },
    "donations": {
      "total_count": 5000,
      "success_count": 4500,
      "failed_count": 500,
      "total_amount": 10000000000
    }
  }
}

### GET /api/admin/profile
Xem thông tin cá nhân admin

Headers:
- Authorization: Bearer <token>

Response Success:
{
  "success": true,
  "data": {
    "id": "uuid",
    "full_name": "Nguyễn Văn A",
    "email": "admin@giveback.local",
    "phone": "0123456789",
    "profile_image": "URL",
    "is_system_admin": true,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}

### PUT /api/admin/profile
Cập nhật thông tin cá nhân admin

Headers:
- Authorization: Bearer <token>

Request Body:
- full_name: string - Họ tên mới
- phone: string - Số điện thoại mới
- profile_image: string - URL ảnh đại diện mới

Response Success:
{
  "success": true,
  "message": "Cập nhật thông tin thành công"
}

## Error Responses (4xx/5xx)
{
  "success": false,
  "message": "Mô tả lỗi",
  "error": "Chi tiết lỗi"
}

## Validation Rules
- Chỉ system admin mới có quyền xác thực tổ chức
- Phải có ghi chú khi từ chối xác thực tổ chức
- Không thể thay đổi trạng thái xác thực của tổ chức đã VERIFIED
- Chỉ admin mới có quyền truy cập các API này
- Email phải là định dạng email hợp lệ
- Số điện thoại phải là số điện thoại Việt Nam hợp lệ
- URL ảnh phải là URL hợp lệ

## Notes
- Thống kê được cache và cập nhật mỗi giờ
- Có thể export thống kê ra file Excel
- Lưu log mọi thao tác của admin
- Backup dữ liệu định kỳ