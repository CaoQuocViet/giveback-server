KẾ HOẠCH PHÁT TRIỂN BACKEND (5 NGÀY)

TỔNG QUAN
- Đã có: Database schema, seeders data, cấu trúc project, API documentation
- Cần làm: Implement các API endpoints và business logic

NGÀY 1: AUTHENTICATION & CORE SETUP
Buổi sáng - Core Setup (3h)
1. Dependencies & Configuration
- express: ^4.17.1
- sequelize: ^6.6.5
- jsonwebtoken: ^8.5.1
- bcryptjs: ^2.4.3
- cors: ^2.8.5
- helmet: ^4.6.0
- compression: ^1.7.4

2. Core Middleware Setup
- Error handling
- JWT authentication
- Role authorization
- Request validation

Buổi chiều - Authentication (5h)
1. Login API (Ưu tiên 1)
- loginUser()
- validateToken()

NGÀY 2: CAMPAIGN & COMMENT FEATURES
Buổi sáng - Campaign Management (4h)
1. Campaign APIs
- getCampaigns()     // Danh sách chiến dịch
- getCampaignDetail()// Chi tiết chiến dịch
- createCampaign()   // Tạo chiến dịch mới
- updateCampaign()   // Cập nhật chiến dịch

2. Campaign Validation
- Verify charity status
- Date validation
- Amount validation

Buổi chiều - Comment System (4h)
1. Comment APIs
- getComments()      // Lấy comments của campaign
- createComment()    // Thêm comment mới
- updateComment()    // Sửa comment
- deleteComment()    // Xóa comment

NGÀY 3: CHARITY & ADMIN FEATURES
Buổi sáng - Charity Management (4h)
1. Charity APIs
- getCharityProfile()
- updateCharityProfile()
- getCharityCampaigns()
- getCharityStatistics()

Buổi chiều - Admin Features (4h)
1. Admin APIs
- verifyCharity()      // Xác thực tổ chức
- getSystemStatistics()// Thống kê hệ thống
- getUsersList()       // Quản lý users

NGÀY 4: DISTRIBUTION & TESTING
Buổi sáng - Distribution System (4h)
1. Distribution APIs
- createDistribution()
- getDistributions()
- updateDistribution()
- deleteDistribution()

Buổi chiều - Testing (4h)
1. Unit Tests
- auth.test.js
- campaign.test.js
- charity.test.js
- admin.test.js

NGÀY 5: REGISTRATION & PAYMENT
Buổi sáng - Registration System (4h)
1. Registration APIs
- register()
- verifyOTP()
- resendOTP()

Buổi chiều - Payment System (4h)
1. Payment APIs
- createDonation()
- getDonations()
- handlePaymentCallback()

THỨ TỰ ƯU TIÊN
1. Login & Authentication
2. Campaign listing & details
3. Comments & Ratings
4. Charity management
5. Admin features
6. Distribution tracking
7. Registration
8. Payment processing

TIPS TRIỂN KHAI
1. Sử dụng dữ liệu mẫu có sẵn để test
2. Implement JWT authentication sớm
3. Tập trung vào business logic trước
4. Viết unit test song song
5. Để lại payment integration cuối cùng

VALIDATION RULES CẦN NHỚ
1. Tổ chức phải được xác thực (VERIFIED) để tạo chiến dịch
2. Chiến dịch chỉ được xóa khi ở trạng thái STARTING
3. Số tiền phân phối không được vượt quá số tiền còn lại của chiến dịch
4. Ngày kết thúc phải sau ngày bắt đầu
5. File upload: Max 5MB/file, tối đa 10 files

CACHE STRATEGY
1. Dữ liệu địa chính được cache và cập nhật theo định kỳ
2. Thống kê được cache và cập nhật mỗi giờ
3. Top charities/campaigns dựa trên: số tiền quyên góp, rating, số lượng chiến dịch