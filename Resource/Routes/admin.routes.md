# API Quản lý Profile Admin:
GET /api/admin/profile
PUT /api/admin/profile
PUT /api/admin/change-password
PUT /api/admin/avatar

# API Quản lý Tổ chức từ thiện:
GET /api/admin/charities - Danh sách tổ chức
GET /api/admin/charities/:id - Chi tiết tổ chức
PUT /api/admin/charities/:id/verify - Xác minh tổ chức
PUT /api/admin/charities/:id/status - Thay đổi trạng thái (active/inactive)
GET /api/admin/charities/pending - Danh sách đợi xác minh

# API Quản lý Chiến dịch:
GET /api/admin/campaigns - Danh sách chiến dịch
GET /api/admin/campaigns/:id - Chi tiết chiến dịch
PUT /api/admin/campaigns/:id/verify - Xác minh chiến dịch
PUT /api/admin/campaigns/:id/status - Thay đổi trạng thái
GET /api/admin/campaigns/pending - Danh sách đợi xác minh

# API Quản lý Người dùng:
GET /api/admin/users - Danh sách người dùng
GET /api/admin/users/:id - Chi tiết người dùng
PUT /api/admin/users/:id/status - Khóa/mở khóa tài khoản
GET /api/admin/users/statistics - Thống kê người dùng theo role

# API Báo cáo & Thống kê:
GET /api/admin/statistics/overview - Tổng quan hệ thống
GET /api/admin/statistics/donations - Thống kê quyên góp
GET /api/admin/statistics/campaigns - Thống kê chiến dịch
GET /api/admin/reports - Danh sách báo cáo vi phạm
PUT /api/admin/reports/:id/resolve - Xử lý báo cáo

# API Logs & Audit:
GET /api/admin/logs/activities - Lịch sử hoạt động
GET /api/admin/logs/system - Logs hệ thống
GET /api/admin/audit-trails - Audit trail