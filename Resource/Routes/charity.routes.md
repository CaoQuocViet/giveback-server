# Charity Routes

## Mục đích
- Quản lý thông tin tổ chức
- CRUD chiến dịch
- Quản lý phân phối cứu trợ
- Xem thống kê và báo cáo

## Routes

### GET /api/charities/profile
Lấy thông tin tổ chức

Headers:
- Authorization: Bearer <token>

Response Success:
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Tên tổ chức",
    "description": "Mô tả",
    "website": "URL",
    "social_links": {
      "facebook": "URL",
      "twitter": "URL"
    },
    "bank_account": "123456789",
    "merchant_id": "MERCHANT_ID",
    "merchant_name": "TÊN MERCHANT",
    "payment_gateway": "VNPAY",
    "api_key": "API_KEY",
    "verification_status": "VERIFIED",
    "campaign_count": 10,
    "total_raised": 1000000,
    "rating": 4.5
  }
}

### PUT /api/charities/profile
Cập nhật thông tin tổ chức

Headers:
- Authorization: Bearer <token>

Request Body:
- title: string - Tên tổ chức
- description: text - Mô tả
- website: string - Website
- social_links: object - Links mạng xã hội
- bank_account: string - Số tài khoản
- merchant_id: string - ID merchant
- merchant_name: string - Tên merchant
- payment_gateway: string - Cổng thanh toán
- api_key: string - API key

Response Success:
{
  "success": true,
  "message": "Cập nhật thành công"
}

### POST /api/campaigns
Tạo chiến dịch mới

Headers:
- Authorization: Bearer <token>

Request Body:
- title: string (required) - Tên chiến dịch
- description: text (required) - Mô tả
- target_amount: number (required) - Mục tiêu gây quỹ
- start_date: date (required) - Ngày bắt đầu
- end_date: date (required) - Ngày kết thúc
- images: File[] - Ảnh chiến dịch
- documents: File[] - Tài liệu đính kèm

Response Success:
{
  "success": true,
  "message": "Tạo chiến dịch thành công",
  "data": {
    "id": "uuid",
    "title": "string",
    "status": "STARTING"
  }
}

### GET /api/campaigns/:id
Xem chi tiết chiến dịch

Headers:
- Authorization: Bearer <token>

Parameters:
- id: string - ID chiến dịch

Response Success:
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "string",
    "description": "text",
    "target_amount": 1000000,
    "current_amount": 500000,
    "start_date": "2024-03-20",
    "end_date": "2024-04-20",
    "status": "ONGOING",
    "images": ["url1", "url2"],
    "documents": ["url1", "url2"],
    "rating": 4.5,
    "donation_count": 50
  }
}

### PUT /api/campaigns/:id
Cập nhật chiến dịch

Headers:
- Authorization: Bearer <token>

Parameters:
- id: string - ID chiến dịch

Request Body: (các trường có thể cập nhật)
- title: string - Tên chiến dịch
- description: text - Mô tả
- target_amount: number - Mục tiêu gây quỹ
- end_date: date - Ngày kết thúc
- images: File[] - Ảnh chiến dịch
- documents: File[] - Tài liệu đính kèm

Response Success:
{
  "success": true,
  "message": "Cập nhật thành công"
}

### DELETE /api/campaigns/:id
Xóa chiến dịch (chỉ xóa được khi status=STARTING)

Headers:
- Authorization: Bearer <token>

Parameters:
- id: string - ID chiến dịch

Response Success:
{
  "success": true,
  "message": "Xóa chiến dịch thành công"
}

### POST /api/distributions
Tạo phân phối cứu trợ mới

Headers:
- Authorization: Bearer <token>

Request Body:
- campaign_id: string (required) - ID chiến dịch
- amount: number (required) - Số tiền phân phối
- description: text (required) - Mô tả hoạt động
- location: string (required) - Địa điểm
- date: date (required) - Ngày phân phối
- images: File[] - Ảnh minh chứng
- documents: File[] - Tài liệu đính kèm

Response Success:
{
  "success": true,
  "message": "Tạo phân phối thành công"
}

### GET /api/distributions
Xem danh sách phân phối

Headers:
- Authorization: Bearer <token>

Query Parameters:
- campaign_id: string - Lọc theo chiến dịch
- from_date: date - Từ ngày
- to_date: date - Đến ngày
- page: number - Trang
- limit: number - Số lượng/trang

Response Success:
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "campaign_id": "uuid",
        "amount": 1000000,
        "description": "text",
        "location": "string",
        "date": "2024-03-20",
        "images": ["url1", "url2"],
        "documents": ["url1", "url2"]
      }
    ],
    "total": 100,
    "page": 1,
    "limit": 10
  }
}

## Error Responses (4xx/5xx)
{
  "success": false,
  "message": "Mô tả lỗi",
  "error": "Chi tiết lỗi"
}

## Validation Rules
- Tổ chức phải được xác thực (VERIFIED) để tạo chiến dịch
- Chiến dịch chỉ được xóa khi ở trạng thái STARTING
- Số tiền phân phối không được vượt quá số tiền còn lại của chiến dịch
- Ngày kết thúc phải sau ngày bắt đầu
- File upload: Max 5MB/file, tối đa 10 files