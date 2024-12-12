# Upload Routes

## Mục đích
- Upload files (ảnh, documents) 
- Quản lý files đã upload
- Xử lý xóa files không cần thiết
- Lưu trữ files trong thư mục /storage
- Lưu đường dẫn truy xuất trong DB

## Routes

### POST /api/upload
Upload file mới

Headers:
- Authorization: Bearer <token>
- Content-Type: multipart/form-data

Request Body:
- files: File[] cần upload (tối đa 10 files)
- type: Loại file ("profile" | "campaign" | "license" | "proof" | "distribution" | "comment")
- campaign_id: string (required if type=comment) - ID chiến dịch
- description: string - Mô tả file

Response Success (200):
{
  "success": true,
  "message": "Upload thành công",
  "data": [{
    "id": "uuid", 
    "url": "/storage/{type}/{filename}",
    "filename": "random_name.ext",
    "original_name": "original.jpg",
    "mimetype": "image/jpeg",
    "size": 1234567,
    "description": "Mô tả",
    "type": "profile",
    "campaign_id": "uuid",
    "user_id": "uuid",
    "created_at": "2024-03-20T00:00:00Z"
  }]
}

### GET /api/upload
Xem danh sách files đã upload

Headers:
- Authorization: Bearer <token>

Query Parameters:
- type: string - Lọc theo loại file
- campaign_id: string - Lọc theo chiến dịch
- from_date: date - Từ ngày
- to_date: date - Đến ngày
- page: number - Trang hiện tại
- limit: number - Số lượng/trang

Response Success:
{
  "success": true,
  "data": {
    "items": [File[]],
    "total": number,
    "page": number,
    "limit": number
  }
}

### DELETE /api/upload/:id
Xóa file đã upload

Headers:
- Authorization: Bearer <token>

Parameters:
- id: ID của file cần xóa

Response Success (200):
{
  "success": true,
  "message": "Xóa file thành công"
}

Response Error (4xx/5xx):
{
  "success": false, 
  "message": "Lỗi xóa file",
  "error": "Chi tiết lỗi"
}

Validation:
- File phải tồn tại
- Chỉ user sở hữu file được xóa
- Không xóa file đang sử dụng

## Validation Rules
- File size: Max 5MB/file
- Tổng dung lượng: Max 50MB/request
- File types:
  + profile: image/jpeg, image/png (max 2MB)
  + campaign: image/jpeg, image/png (max 5MB)
  + license: image/jpeg, image/png, application/pdf (max 5MB)
  + proof: image/jpeg, image/png, application/pdf (max 5MB)
  + distribution: image/jpeg, image/png (max 5MB)
  + comment: image/jpeg, image/png (max 2MB)
- Required: files, type
- Type phải hợp lệ
- Số lượng file: Max 10 files/request
- Tên file không chứa ký tự đặc biệt
- File phải tồn tại
- Chỉ user sở hữu file được xóa
- Không xóa file đang sử dụng
- Giới hạn số lượng upload/ngày/user: 100 files
- Mô tả file tối đa 500 ký tự

## Error Codes
400: Bad Request - Thông tin không hợp lệ
401: Unauthorized - Chưa đăng nhập
403: Forbidden - Không có quyền
404: Not Found - File không tồn tại  
413: Payload Too Large - File quá lớn
415: Unsupported Media Type - Định dạng không hỗ trợ
429: Too Many Requests - Vượt quá giới hạn upload
500: Internal Server Error - Lỗi server

## Notes
- Files được lưu trong /storage/{type}/{filename}
- Tên file được random để tránh trùng
- File không dùng sau 24h sẽ bị xóa
- Backup files định kỳ
- Nén ảnh tự động nếu > 1MB
- Quét virus/malware trước khi lưu
- Tạo thumbnail cho ảnh
- Lưu log mọi thao tác upload/delete
- Cache thông tin file để tối ưu hiệu năng