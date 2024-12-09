# Common Routes

## Mục đích
- API dùng chung cho toàn hệ thống
- Lấy dữ liệu địa chính
- Thống kê chung

## Routes

### GET /api/provinces
Lấy danh sách tỉnh/thành

Response Success:
{
  "success": true,
  "data": [
    {
      "code": "01",
      "name": "Hà Nội",
      "name_en": "Ha Noi",
      "full_name": "Thành phố Hà Nội",
      "full_name_en": "Ha Noi City",
      "code_name": "ha_noi"
    }
  ]
}

### GET /api/districts
Lấy danh sách quận/huyện theo tỉnh/thành

Query Parameters:
- province_code: string (required) - Mã tỉnh/thành

Response Success:
{
  "success": true,
  "data": [
    {
      "code": "001",
      "name": "Ba Đình",
      "name_en": "Ba Dinh",
      "full_name": "Quận Ba Đình",
      "full_name_en": "Ba Dinh District",
      "code_name": "ba_dinh",
      "province_code": "01"
    }
  ]
}

### GET /api/wards
Lấy danh sách phường/xã theo quận/huyện

Query Parameters:
- district_code: string (required) - Mã quận/huyện

Response Success:
{
  "success": true,
  "data": [
    {
      "code": "00001", 
      "name": "Phúc Xá",
      "name_en": "Phuc Xa",
      "full_name": "Phường Phúc Xá",
      "full_name_en": "Phuc Xa Ward",
      "code_name": "phuc_xa",
      "district_code": "001"
    }
  ]
}

### GET /api/statistics
Xem thống kê chung của hệ thống

Response Success:
{
  "success": true,
  "data": {
    "total_users": {
      "all": 1000,
      "donors": 800,
      "charities": 100,
      "beneficiaries": 100
    },
    "total_campaigns": {
      "all": 500,
      "starting": 100,
      "ongoing": 200,
      "closed": 150,
      "completed": 50
    },
    "total_donations": {
      "count": 10000,
      "amount": 1000000000
    },
    "total_distributions": {
      "count": 1000,
      "amount": 800000000
    },
    "top_charities": [
      {
        "id": "uuid",
        "title": "Tên tổ chức",
        "total_raised": 100000000,
        "campaign_count": 10,
        "rating": 4.8
      }
    ],
    "top_campaigns": [
      {
        "id": "uuid",
        "title": "Tên chiến dịch",
        "current_amount": 50000000,
        "target_amount": 100000000,
        "rating": 4.5,
        "charity": {
          "id": "uuid",
          "title": "Tên tổ chức"
        }
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

## Notes
- Dữ liệu địa chính được cache và cập nhật theo định kỳ
- Thống kê được cache và cập nhật mỗi giờ
- Top charities/campaigns dựa trên: số tiền quyên góp, rating, số lượng chiến dịch