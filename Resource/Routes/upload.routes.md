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
- file: File cần upload
- type: Loại file ("profile" | "campaign" | "license" | "proof")

Response Success (200):
{
  "success": true,
  "message": "Upload thành công",
  "data": {
    "url": "/storage/{type}/{filename}",
    "filename": "random_name.ext",
    "mimetype": "image/jpeg",
    "size": 1234567
  }
}

Response Error (4xx/5xx):
{
  "success": false,
  "message": "Lỗi upload file",
  "error": "Chi tiết lỗi"
}

Validation:
- File size: Max 5MB
- File types:
  + profile: image/jpeg, image/png
  + campaign: image/jpeg, image/png  
  + license: image/jpeg, image/png, application/pdf
  + proof: image/jpeg, image/png, application/pdf
- Required: file, type
- Type phải hợp lệ

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

## Error Codes
400: Bad Request - Thông tin không hợp lệ
401: Unauthorized - Chưa đăng nhập
403: Forbidden - Không có quyền
404: Not Found - File không tồn tại  
413: Payload Too Large - File quá lớn
415: Unsupported Media Type - Định dạng không hỗ trợ
500: Internal Server Error - Lỗi server

## Notes
- Files được lưu trong /storage/{type}/{filename}
- Tên file được random để tránh trùng
- File không dùng sau 24h sẽ bị xóa
- Giới hạn số lượng upload/ngày/user