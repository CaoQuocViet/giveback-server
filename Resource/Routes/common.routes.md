# Common Routes

## Mục đích
- API dùng chung cho toàn hệ thống
- Lấy dữ liệu địa chính
- Thống kê chung
- Bình luận và đánh giá
- Báo cáo và thống kê

## Routes

### GET /api/administrative/provinces
Lấy danh sách tỉnh/thành phố

Response Success:
{
  "success": true,
  "data": [{
    "code": "hanoi",
    "name": "Hà Nội"
  }, {
    "code": "hochiminh", 
    "name": "Hồ Chí Minh"
  }]
}

### GET /api/administrative/districts/:province
Lấy danh sách quận/huyện của tỉnh/thành phố

Parameters:
- province: string - Mã tỉnh/thành phố

Response Success:
{
  "success": true,
  "data": [{
    "code": "ba-dinh",
    "name": "Ba Đình"
  }, {
    "code": "hoan-kiem",
    "name": "Hoàn Kiếm"
  }]
}

### GET /api/administrative/wards/:province/:district
Lấy danh sách phường/xã của quận/huyện

Parameters:
- province: string - Mã tỉnh/thành phố
- district: string - Mã quận/huyện

Response Success:
{
  "success": true,
  "data": [{
    "code": "phuc-xa",
    "name": "Phúc Xá"
  }, {
    "code": "truc-bach",
    "name": "Trúc Bạch"
  }]
}

## Error Responses (4xx/5xx)
{
  "success": false,
  "message": "Mô tả lỗi",
  "error": "Chi tiết lỗi"
}

## Validation Rules
- Mã tỉnh/thành phố phải hợp lệ
- Mã quận/huyện phải thuộc tỉnh/thành phố
- Mã phường/xã phải thuộc quận/huyện

## Notes
- Dữ liệu được cache để tối ưu hiệu năng
- Cache được cập nhật khi có thay đổi từ file JSON
- Hỗ trợ tìm kiếm không dấu
- Trả về mã để sử dụng cho các API khác
- Trả về tên để hiển thị trên UI

### GET /api/statistics
Xem thống kê chung hệ thống

Query Parameters:
- from_date: date - Thống kê từ ngày
- to_date: date - Thống kê đến ngày
- type: string - Loại thống kê (daily|monthly|yearly)

Response Success:
{
  "success": true,
  "data": {
    "total_charities": number,
    "total_campaigns": number,
    "total_donated": number,
    "total_distributed": number,
    "total_donors": number,
    "total_beneficiaries": number,
    "top_charities": [{
      "id": "uuid",
      "title": "Tên tổ chức",
      "total_raised": number,
      "campaign_count": number,
      "rating": number
    }],
    "top_campaigns": [{
      "id": "uuid", 
      "title": "Tên chiến dịch",
      "total_raised": number,
      "donor_count": number,
      "rating": number
    }],
    "donation_chart": [{
      "date": "2024-03",
      "amount": number
    }],
    "distribution_chart": [{
      "date": "2024-03",
      "amount": number
    }]
  }
}

### GET /api/reports
Xem báo cáo tổng quan hệ thống

Query Parameters:
- type: string (required) - Loại báo cáo (campaigns|charities|donations|distributions)
- format: string (optional) - Định dạng xuất (pdf|excel)
- from_date: date - Từ ngày
- to_date: date - Đến ngày
- status: string - Lọc theo trạng thái
- province: string - Lọc theo tỉnh/thành

Response Success:
{
  "success": true,
  "data": {
    "file_url": "URL file báo cáo",
    "expires_at": "2024-03-21T00:00:00Z"
  }
}

### GET /api/campaigns/:id/report
Xem báo cáo chi tiết chiến dịch

Parameters:
- id: string - ID chiến dịch

Query Parameters:
- format: string (optional) - Định dạng xuất (pdf|excel)

Response Success:
{
  "success": true,
  "data": {
    "file_url": "URL file báo cáo",
    "expires_at": "2024-03-21T00:00:00Z"
  }
}

### POST /api/comments
Thêm bình luận mới

Headers:
- Authorization: Bearer <token>

Request Body:
- campaign_id: string (required) - ID chiến dịch
- content: string (required) - Nội dung bình luận
- rating: number (1-5) - Đánh giá sao
- parent_id: string - ID bình luận cha (nếu là reply)
- images: string[] - Danh sách URL ảnh

Response Success:
{
  "success": true,
  "data": {
    "id": "uuid",
    "content": "Nội dung",
    "rating": 5,
    "images": ["URL"],
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
- rating: number (1-5) - Đánh giá mới
- images: string[] - Danh sách URL ảnh mới

Response Success:
{
  "success": true,
  "message": "Cập nhật bình luận thành công"
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
  "message": "Xóa bình luận thành công"
}

## Error Responses (4xx/5xx)
{
  "success": false,
  "message": "Mô tả lỗi",
  "error": "Chi tiết lỗi"
}

## Validation Rules
- Chỉ được đánh giá chiến dịch khi đã đóng góp thành công
- Chỉ được sửa/xóa bình luận của chính mình
- Không thể sửa/xóa bình luận sau 24h
- Nội dung bình luận không được trống và tối đa 1000 ký tự
- Rating phải từ 1-5 sao
- URL ảnh phải hợp lệ
- Tối đa 5 ảnh/bình luận
- Chỉ hỗ trợ định dạng ảnh: jpg, jpeg, png
- Kích thước ảnh tối đa 2MB

## Notes
- Dữ liệu địa chính được cache và cập nhật theo định kỳ
- Thống kê được cache và cập nhật mỗi giờ
- Top charities/campaigns dựa trên: số tiền quyên góp, rating, số lượng chiến dịch
- File báo cáo có hiệu lực trong 24h
- Nén file báo cáo nếu > 10MB
- Lưu log mọi thao tác quan trọng