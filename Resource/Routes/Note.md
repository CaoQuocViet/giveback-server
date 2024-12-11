# API Routes Implementation Status

## Common Routes (All Roles)
- GET /api/charities - Lấy danh sách tổ chức từ thiện  -- DONE
- GET /api/charities/:id - Xem chi tiết tổ chức từ thiện
- GET /api/campaigns - Lấy danh sách chiến dịch
- GET /api/campaigns/:id - Xem chi tiết chiến dịch
- GET /api/statistics/overview - Thống kê tổng quan tại dashboard(số lượng tổ chức, chiến dịch, tổng tiền quyên góp...)  -- DONE

## Location Routes (All Roles)
- GET /api/locations/provinces - Lấy danh sách tỉnh/thành phố  -- DONE
- GET /api/locations/districts/:provinceCode - Lấy danh sách quận/huyện theo tỉnh  -- DONE
- GET /api/locations/wards/:districtCode - Lấy danh sách phường/xã theo quận/huyện  -- DONE

## Admin Routes
- PUT /api/admin/charities/:id/verify - Xác minh tổ chức
- GET /api/admin/charities/pending - Danh sách tổ chức chờ xác minh
- GET /api/admin/statistics/overview - Thống kê tổng quan hệ thống

## Charity Routes
- PUT /api/charities/profile - Cập nhật thông tin tổ chức
- POST /api/charities/campaigns - Tạo chiến dịch mới
- PUT /api/charities/campaigns/:id - Cập nhật chiến dịch

## Donor Routes
- POST /api/campaigns/:id/donate - Đóng góp cho chiến dịch
- GET /api/donor/donations - Lịch sử đóng góp

## User Routes
- GET /api/user/profile - Xem thông tin cá nhân
- PUT /api/user/profile - Cập nhật thông tin cá nhân
- PUT /api/user/change-password - Đổi mật khẩu

## Authentication Routes
- POST /api/auth/login - Đăng nhập  -- DONE
- POST /api/auth/register - Đăng ký
- POST /api/auth/logout - Đăng xuất
- POST /api/auth/refresh-token - Làm mới token

## Notes
- Các API đều yêu cầu JWT token trong header trừ login/register và location routes
- Response format thống nhất:  ```json
  {
    "success": boolean,
    "data": object | null,
    "error": string | null
  }  ```
