# Charity Routes

## Mục đích
- Quản lý chiến dịch từ thiện
- Quản lý đóng góp và phân phối
- Quản lý thông tin tổ chức

## Routes

### POST /api/charities/campaigns
Tạo chiến dịch mới

Headers:
- Authorization: Bearer <token>

Request Body:
- title: string (required) - Tên chiến dịch
- description: text (required) - Mô tả ngắn
- content: text (required) - Nội dung chi tiết (HTML)
- thumbnail_url: string (required) - URL ảnh đại diện
- category: string (required) - Danh mục
- target_amount: number (required) - Số tiền mục tiêu
- start_date: date (required) - Ngày bắt đầu
- end_date: date (required) - Ngày kết thúc
- province: string (required) - Tỉnh/thành
- district: string (required) - Quận/huyện
- ward: string - Phường/xã
- address: string - Địa chỉ cụ thể
- images: string[] - Danh sách URL ảnh
- documents: string[] - Danh sách URL tài liệu

Response Success:
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "STARTING",
    "created_at": "2024-03-20T00:00:00Z"
  }
}

### PUT /api/charities/campaigns/:id
Sửa thông tin chiến dịch

Headers:
- Authorization: Bearer <token>

Parameters:
- id: string - ID chiến dịch

Request Body: (các trường tùy chọn)
- title: string - Tên chiến dịch
- description: text - Mô tả ngắn
- content: text - Nội dung chi tiết
- thumbnail_url: string - URL ảnh đại diện
- category: string - Danh mục
- target_amount: number - Số tiền mục tiêu
- start_date: date - Ngày bắt đầu
- end_date: date - Ngày kết thúc
- province: string - Tỉnh/thành
- district: string - Quận/huyện
- ward: string - Phường/xã
- address: string - Địa chỉ cụ thể
- images: string[] - Danh sách URL ảnh
- documents: string[] - Danh sách URL tài liệu
- status: enum (STARTING|ONGOING|CLOSED) - Trạng thái mới

Response Success:
{
  "success": true,
  "message": "Cập nhật chiến dịch thành công"
}

### DELETE /api/charities/campaigns/:id
Xóa chiến dịch

Headers:
- Authorization: Bearer <token>

Parameters:
- id: string - ID chiến dịch

Response Success:
{
  "success": true,
  "message": "Xóa chiến dịch thành công"
}

### POST /api/charities/campaigns/:id/donations
Tạo khoản đóng góp trung gian (offline)

Headers:
- Authorization: Bearer <token>

Parameters:
- id: string - ID chiến dịch

Request Body:
- amount: number (required) - Số tiền đóng góp
- donor_name: string (required) - Tên người đóng góp
- donor_phone: string - Số điện thoại
- donor_email: string - Email
- payment_method: string (required) - Phương thức (CASH|TRANSFER)
- payment_proof: string (required) - URL ảnh chứng từ
- note: string - Ghi chú

Response Success:
{
  "success": true,
  "data": {
    "donation_id": "uuid",
    "created_at": "2024-03-20T00:00:00Z"
  }
}

### POST /api/charities/distributions
Tạo khoản phân phối cứu trợ

Headers:
- Authorization: Bearer <token>

Request Body:
- campaign_id: string (required) - ID chiến dịch
- amount: number (required) - Số tiền phân phối
- beneficiary_count: number (required) - Số người được hỗ trợ
- description: text (required) - Mô tả hoạt động
- province: string (required) - Tỉnh/thành
- district: string (required) - Quận/huyện
- ward: string - Phường/xã
- address: string - Địa chỉ cụ thể
- images: string[] (required) - URL ảnh hoạt động
- documents: string[] - URL tài liệu chứng từ

Response Success:
{
  "success": true,
  "data": {
    "distribution_id": "uuid",
    "created_at": "2024-03-20T00:00:00Z"
  }
}

### GET /api/charities/profile
Xem thông tin tổ chức

Headers:
- Authorization: Bearer <token>

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
    "verification_status": "VERIFIED",
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
    "ward": "Phường/xã",
    "address": "Địa chỉ",
    "rating": 4.5,
    "campaign_count": 10,
    "total_raised": 1000000000,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}

### PUT /api/charities/profile
Cập nhật thông tin tổ chức

Headers:
- Authorization: Bearer <token>

Request Body: (các trường tùy chọn)
- title: string - Tên tổ chức
- description: text - Mô tả
- phone: string - Số điện thoại
- profile_image: string - URL ảnh đại diện
- founding_date: date - Ngày thành lập
- website: string - Website
- social_links: object - Mạng xã hội
- merchant_id: string - Mã merchant
- merchant_name: string - Tên merchant
- bank_account: string - Số tài khoản
- bank_name: string - Tên ngân hàng
- bank_branch: string - Chi nhánh
- bank_owner: string - Chủ tài khoản
- payment_gateway: string - Cổng thanh toán
- province: string - Tỉnh/thành
- district: string - Quận/huyện
- ward: string - Phường/xã
- address: string - Địa chỉ

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
- Tổ chức phải được xác thực (VERIFIED) để tạo chiến dịch
- Chiến dịch chỉ được xóa khi ở trạng thái STARTING
- Số tiền phân phối không được vượt quá số tiền còn lại của chiến dịch
- Ngày kết thúc phải sau ngày bắt đầu
- Số tiền mục tiêu tối thiểu 10,000,000 VND
- URL ảnh và tài liệu phải hợp lệ
- Thông tin ngân hàng phải đầy đủ để nhận thanh toán
- Thông tin merchant phải hợp lệ với cổng thanh toán

## Notes
- Cache thông tin tổ chức để tối ưu hiệu năng
- Tự động cập nhật rating khi có đánh giá mới
- Lưu log mọi thao tác quan trọng
- Backup dữ liệu định kỳ