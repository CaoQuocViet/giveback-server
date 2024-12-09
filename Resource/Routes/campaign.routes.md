# Campaign Routes

## Mục đích
- Xem danh sách chiến dịch
- Tìm kiếm và lọc chiến dịch
- Xem chi tiết chiến dịch
- Thống kê chiến dịch

## Routes

### GET /api/campaigns
Lấy danh sách chiến dịch

Query Parameters:
- status: enum - Lọc theo trạng thái (STARTING/ONGOING/CLOSED/COMPLETED)
- charity_id: string - Lọc theo tổ chức
- province: string - Lọc theo tỉnh/thành
- sort: string - Sắp xếp (created_at/rating/current_amount)
- order: string - Thứ tự (asc/desc)
- page: number - Trang hiện tại
- limit: number - Số lượng/trang

Response Success:
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "title": "Tên chiến dịch",
        "description": "Mô tả ngắn",
        "images": ["url1", "url2"],
        "target_amount": 1000000000,
        "current_amount": 500000000,
        "start_date": "2024-03-20",
        "end_date": "2024-04-20",
        "status": "ONGOING",
        "rating": 4.5,
        "province": "Hồ Chí Minh",
        "charity": {
          "id": "uuid",
          "title": "Tên tổ chức",
          "rating": 4.8
        }
      }
    ],
    "total": 100,
    "page": 1,
    "limit": 10
  }
}

### GET /api/campaigns/search
Tìm kiếm chiến dịch

Query Parameters:
- q: string - Từ khóa tìm kiếm
- filters: object - Các bộ lọc
- page: number - Trang hiện tại
- limit: number - Số lượng/trang

Response Success:
{
  "success": true,
  "data": {
    "items": [...],
    "total": 50,
    "page": 1,
    "limit": 10
  }
}

### GET /api/campaigns/featured
Lấy danh sách chiến dịch nổi bật

Query Parameters:
- limit: number - Số lượng (mặc định: 5)

Response Success:
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "title": "Tên chiến dịch",
        "description": "Mô tả ngắn",
        "images": ["url1"],
        "target_amount": 1000000000,
        "current_amount": 800000000,
        "status": "ONGOING",
        "rating": 4.8,
        "charity": {
          "id": "uuid", 
          "title": "Tên tổ chức"
        }
      }
    ]
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
    "images": ["url1", "url2"],
    "target_amount": 1000000000,
    "current_amount": 500000000,
    "start_date": "2024-03-20",
    "end_date": "2024-04-20",
    "status": "ONGOING",
    "rating": 4.5,
    "detail_goal": {
      "objectives": "Mục tiêu cụ thể",
      "beneficiaries": "Đối tượng hỗ trợ",
      "implementation": "Phương thức thực hiện",
      "budget_plan": "Kế hoạch phân bổ"
    },
    "location": {
      "province": "Hồ Chí Minh",
      "district": "Quận 1",
      "ward": "Phường Bến Nghé",
      "address": "123 Đường ABC"
    },
    "charity": {
      "id": "uuid",
      "title": "Tên tổ chức",
      "description": "Mô tả",
      "rating": 4.8,
      "verified": true
    }
  }
}

### GET /api/campaigns/:id/statistics
Xem thống kê chiến dịch

Parameters:
- id: string - ID chiến dịch

Response Success:
{
  "success": true,
  "data": {
    "donation_stats": {
      "total_donors": 1000,
      "total_amount": 500000000,
      "avg_amount": 500000
    },
    "distribution_stats": {
      "total_distributions": 5,
      "distributed_amount": 400000000,
      "remaining_amount": 100000000
    },
    "rating_stats": {
      "avg_rating": 4.5,
      "total_ratings": 100,
      "rating_distribution": {
        "5": 50,
        "4": 30,
        "3": 15,
        "2": 3,
        "1": 2
      }
    }
  }
}

## Error Responses (4xx/5xx)
{
  "success": false,
  "message": "Mô tả lỗi",
  "error": "Chi tiết lỗi"
}

## Notes
- Chiến dịch nổi bật dựa trên: rating cao, % hoàn thành mục tiêu cao
- Thống kê được cache và cập nhật mỗi giờ
- Chỉ hiển thị chiến dịch của tổ chức đã được xác thực