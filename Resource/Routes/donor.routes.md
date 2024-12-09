# Donor Routes

## Mục đích
- Quản lý đóng góp
- Tương tác với chiến dịch (bình luận, đánh giá)
- Xem lịch sử đóng góp

## Routes

### POST /api/donations
Tạo đóng góp mới

Headers:
- Authorization: Bearer <token>

Request Body:
- campaign_id: string (required) - ID chiến dịch
- amount: number (required) - Số tiền đóng góp
- payment_method: string (required) - Phương thức thanh toán (VNPAY/MOMO)
- message: string - Lời nhắn

Response Success:
{
  "success": true,
  "data": {
    "payment_url": "URL thanh toán",
    "order_id": "Mã đơn hàng"
  }
}

### GET /api/donations
Xem lịch sử đóng góp

Headers:
- Authorization: Bearer <token>

Query Parameters:
- campaign_id: string - Lọc theo chiến dịch
- status: enum - Lọc theo trạng thái (PENDING/SUCCESS/FAILED)
- from_date: date - Từ ngày
- to_date: date - Đến ngày
- page: number - Trang hiện tại
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
        "payment_method": "VNPAY",
        "status": "SUCCESS",
        "message": "Lời nhắn",
        "created_at": "2024-03-20T00:00:00Z",
        "campaign": {
          "id": "uuid",
          "title": "Tên chiến dịch",
          "charity": {
            "id": "uuid",
            "title": "Tên tổ chức"
          }
        }
      }
    ],
    "total": 100,
    "page": 1,
    "limit": 10
  }
}

### POST /api/comments
Thêm bình luận/đánh giá

Headers:
- Authorization: Bearer <token>

Request Body:
- campaign_id: string (required) - ID chiến dịch
- content: string (required) - Nội dung bình luận
- rating: number (1-5) - Đánh giá sao
- parent_id: string - ID bình luận cha (nếu là reply)

Response Success:
{
  "success": true,
  "data": {
    "id": "uuid",
    "content": "Nội dung",
    "rating": 5,
    "created_at": "2024-03-20T00:00:00Z",
    "user": {
      "id": "uuid",
      "full_name": "Nguyễn Văn A",
      "profile_image": "URL"
    }
  }
}

### PUT /api/comments/:id
Sửa bình luận

Headers:
- Authorization: Bearer <token>

Parameters:
- id: string - ID bình luận

Request Body:
- content: string (required) - Nội dung mới
- rating: number - Đánh giá mới

Response Success:
{
  "success": true,
  "message": "Cập nhật thành công"
}

### DELETE /api/comments/:id
Xóa bình luận

Headers:
- Authorization: Bearer <token>

Parameters:
- id: string - ID bình luận

Response Success:
{
  "success": true,
  "message": "Xóa thành công"
}

## Error Responses (4xx/5xx)
{
  "success": false,
  "message": "Mô tả lỗi",
  "error": "Chi tiết lỗi"
}

## Validation Rules
- Số tiền đóng góp tối thiểu 10,000 VND
- Chỉ được đánh giá chiến dịch khi đã đóng góp thành công
- Chỉ được sửa/xóa bình luận của chính mình
- Không thể sửa/xóa bình luận sau 24h
- Không thể đóng góp cho chiến dịch đã kết thúc/đóng

## Notes
- Thanh toán được xử lý qua cổng thanh toán (VNPAY/MOMO)
- Rating của chiến dịch được tự động cập nhật khi có đánh giá mới
- Thống kê đóng góp được cache và cập nhật mỗi giờ