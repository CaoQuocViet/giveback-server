# Admin Routes

## Mục đích
- Quản lý và xác thực tổ chức từ thiện
- Quản lý người dùng hệ thống
- Xem thống kê và báo cáo

## Routes

### GET /api/admin/charities
Lấy danh sách tổ chức từ thiện

Headers:
- Authorization: Bearer <token>

Query Parameters:
- status: enum - Lọc theo trạng thái (PENDING/VERIFIED/REJECTED)
- search: string - Tìm kiếm theo tên/email/phone
- page: number - Trang hiện tại
- limit: number - Số lượng/trang

Response Success:
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "title": "Tên tổ chức",
        "email": "email@org.com",
        "phone": "0123456789",
        "description": "Mô tả",
        "verification_status": "PENDING",
        "license_number": "ABC123",
        "license_date": "2024-01-01",
        "license_issuer": "Sở LĐTBXH",
        "license_image_url": "/storage/licenses/abc.jpg",
        "campaign_count": 10,
        "total_raised": 1000000,
        "rating": 4.5,
        "created_at": "2024-01-01T00:00:00Z"
      }
    ],
    "total": 100,
    "page": 1,
    "limit": 10
  }
}

### GET /api/admin/charities/:id
Xem chi tiết một tổ chức

Headers:
- Authorization: Bearer <token>

Parameters:
- id: string - ID của tổ chức

Response Success:
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Tên tổ chức",
    "description": "Mô tả",
    "email": "email@org.com",
    "phone": "0123456789",
    "verification_status": "PENDING",
    "license_number": "ABC123",
    "license_date": "2024-01-01",
    "license_issuer": "Sở LĐTBXH",
    "license_image_url": "/storage/licenses/abc.jpg",
    "founding_date": "2020-01-01",
    "website": "https://org.com",
    "social_links": {
      "facebook": "URL",
      "twitter": "URL"
    },
    "bank_account": "123456789",
    "bank_name": "Vietcombank",
    "bank_branch": "HCM",
    "bank_owner": "Nguyen Van A",
    "merchant_id": "MERCHANT123",
    "merchant_name": "ORG Payment",
    "payment_gateway": "VNPAY",
    "campaign_count": 10,
    "total_raised": 1000000,
    "rating": 4.5,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}

### PUT /api/admin/charities/:id/verify
Xác thực hoặc từ chối tổ chức

Headers:
- Authorization: Bearer <token>

Parameters:
- id: string - ID của tổ chức

Request Body:
- status: enum (required) - VERIFIED/REJECTED
- note: string - Ghi chú về quyết định

Response Success:
{
  "success": true,
  "message": "Cập nhật trạng thái thành công"
}

### GET /api/admin/users
Quản lý người dùng

Headers:
- Authorization: Bearer <token>

Query Parameters:
- role: enum - Lọc theo vai trò (ADMIN/DONOR/CHARITY/BENEFICIARY)
- search: string - Tìm kiếm theo tên/email/phone
- page: number - Trang hiện tại
- limit: number - Số lượng/trang

Response Success:
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "full_name": "Nguyễn Văn A",
        "email": "email@example.com",
        "phone": "0123456789",
        "role": "DONOR",
        "profile_image": "/storage/profiles/abc.jpg",
        "created_at": "2024-01-01T00:00:00Z"
      }
    ],
    "total": 100,
    "page": 1,
    "limit": 10
  }
}

### GET /api/admin/statistics
Xem thống kê hệ thống

Headers:
- Authorization: Bearer <token>

Query Parameters:
- from_date: date - Từ ngày
- to_date: date - Đến ngày

Response Success:
{
  "success": true,
  "data": {
    "total_users": 1000,
    "total_charities": 100,
    "total_campaigns": 500,
    "total_donations": 10000,
    "total_amount": 1000000000,
    "user_stats": {
      "donors": 800,
      "charities": 100,
      "beneficiaries": 100
    },
    "campaign_stats": {
      "starting": 100,
      "ongoing": 200,
      "closed": 150,
      "completed": 50
    },
    "monthly_donations": [
      {
        "month": "2024-01",
        "count": 1000,
        "amount": 100000000
      }
    ]
  }
}

## Error Responses (4xx/5xx)
{
  "success": false,
  "message": "Mô tả lỗi",
  "error": "Chi tiết lỗi"
}

## Validation Rules
- Chỉ ADMIN mới có quyền truy cập các routes này
- Không thể verify tổ chức đã ở trạng thái VERIFIED/REJECTED
- Thống kê theo khoảng thời gian tối đa 1 năm

## Notes
- Thống kê được cache và cập nhật mỗi giờ
- Dữ liệu nhạy cảm được ẩn (ví dụ: API keys)