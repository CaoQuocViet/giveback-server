# Campaign Routes

## Mục đích
- Xem danh sách và chi tiết chiến dịch
- Tương tác với chiến dịch (bình luận, đánh giá)
- Đóng góp cho chiến dịch

## Routes

### GET /api/campaigns
Xem danh sách chiến dịch

Query Parameters:
- search: string - Tìm theo tên chiến dịch
- charity_id: string - Lọc theo tổ chức
- status: enum (STARTING|ONGOING|CLOSED|COMPLETED) - Lọc theo trạng thái
- category: string - Lọc theo danh mục
- province: string - Lọc theo tỉnh/thành
- from_date: date - Từ ngày
- to_date: date - Đến ngày
- sort_by: string (created_at|end_date|total_raised|donor_count) - Sắp xếp theo
- order: string (asc|desc) - Thứ tự sắp xếp
- page: number - Trang hiện tại
- limit: number - Số lượng/trang

Response Success:
{
  "success": true,
  "data": {
    "items": [{
      "id": "uuid",
      "title": "Tên chiến dịch",
      "description": "Mô tả ngắn",
      "thumbnail_url": "URL",
      "category": "Danh mục",
      "status": "ONGOING",
      "target_amount": 1000000000,
      "current_amount": 500000000,
      "start_date": "2024-01-01",
      "end_date": "2024-12-31",
      "donor_count": 100,
      "rating": 4.5,
      "province": "Tỉnh/Thành",
      "district": "Quận/Huyện",
      "created_at": "2024-01-01T00:00:00Z",
      "charity": {
        "id": "uuid",
        "title": "Tên tổ chức",
        "profile_image": "URL",
        "verification_status": "VERIFIED"
      }
    }],
    "total": 100,
    "page": 1,
    "limit": 10
  }
}

### GET /api/campaigns/:id
Xem chi tiết chiến dịch

Parameters:
- id: string - ID chiến dịch

Response Success:
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Tên chiến dịch",
    "description": "Mô tả chi tiết",
    "content": "Nội dung HTML",
    "thumbnail_url": "URL",
    "images": ["URL1", "URL2"],
    "category": "Danh mục",
    "status": "ONGOING",
    "target_amount": 1000000000,
    "current_amount": 500000000,
    "start_date": "2024-01-01",
    "end_date": "2024-12-31",
    "donor_count": 100,
    "rating": 4.5,
    "province": "Tỉnh/Thành",
    "district": "Quận/Huyện",
    "ward": "Phường/Xã",
    "address": "Địa chỉ cụ thể",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z",
    
    "charity": {
      "id": "uuid", 
      "title": "Tên tổ chức",
      "description": "Mô tả tổ chức",
      "email": "email@org.com",
      "phone": "0123456789",
      "profile_image": "URL",
      "verification_status": "VERIFIED",
      "rating": 4.5
    },

    "recent_donors": [{
      "id": "uuid",
      "full_name": "Nguyễn Văn A",
      "profile_image": "URL",
      "amount": 1000000,
      "message": "Lời nhắn",
      "created_at": "2024-01-01T00:00:00Z"
    }],

    "recent_comments": [{
      "id": "uuid",
      "content": "Nội dung",
      "rating": 5,
      "created_at": "2024-01-01T00:00:00Z",
      "user": {
        "id": "uuid",
        "full_name": "Nguyễn Văn A",
        "profile_image": "URL"
      }
    }]
  }
}

### POST /api/campaigns/:id/comments
Thêm bình luận

Headers:
- Authorization: Bearer <token>

Parameters:
- id: string - ID chiến dịch

Request Body:
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
    "created_at": "2024-01-01T00:00:00Z",
    "user": {
      "id": "uuid",
      "full_name": "Nguyễn Văn A",
      "profile_image": "URL"
    }
  }
}

### PUT /api/campaigns/:id/comments/:commentId
Sửa bình luận

Headers:
- Authorization: Bearer <token>

Parameters:
- id: string - ID chiến dịch
- commentId: string - ID bình luận

Request Body:
- content: string (required) - Nội dung mới
- rating: number (1-5) - Đánh giá sao mới

Response Success:
{
  "success": true,
  "message": "Cập nhật bình luận thành công"
}

### DELETE /api/campaigns/:id/comments/:commentId
Xóa bình luận

Headers:
- Authorization: Bearer <token>

Parameters:
- id: string - ID chiến dịch
- commentId: string - ID bình luận

Response Success:
{
  "success": true,
  "message": "Xóa bình luận thành công"
}

### POST /api/campaigns/:id/donate
Đóng góp cho chiến dịch

Headers:
- Authorization: Bearer <token>

Parameters:
- id: string - ID chiến dịch

Request Body:
- amount: number (required) - Số tiền đóng góp (>= 10,000 VND)
- payment_method: string (required) - Phương thức thanh toán (ZALOPAY|VNPAY|MOMO)
- message: string - Lời nhắn

Response Success:
{
  "success": true,
  "data": {
    "payment_url": "URL thanh toán",
    "order_id": "Mã đơn hàng"
  }
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
- Không thể đóng góp cho chiến dịch của tổ chức chưa được xác thực
- Nội dung bình luận không được trống và tối đa 1000 ký tự
- Rating phải từ 1-5 sao

## Notes
- Thanh toán được xử lý qua các cổng thanh toán tích hợp
- Rating của chiến dịch được tự động cập nhật khi có đánh giá mới
- Cache danh sách chiến dịch để tối ưu hiệu năng
- Lưu log mọi hoạt động liên quan đến đóng góp