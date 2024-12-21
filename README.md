# GIVEBACK Backend

## Giới Thiệu

GIVEBACK Backend là phần cốt lõi của nền tảng hỗ trợ đóng góp từ thiện cho vùng thiên tai tại Việt Nam. Hệ thống này quản lý người dùng, chiến dịch từ thiện, xử lý đóng góp, và tạo các báo cáo minh bạch về việc sử dụng nguồn quỹ. Với thiết kế đảm bảo tính mở rộng và bảo mật, Backend của GIVEBACK đảm bảo các giao dịch và dữ liệu được quản lý một cách hiệu quả và đáng tin cậy.

Chúng tôi mong muốn nhận được sự đóng góp từ cộng đồng để có thể ứng dụng thực tế và hỗ trợ hiệu quả cho người Việt bị ảnh hưởng bởi thiên tai.

## Các Chức Năng Chính

### 1. Đăng Ký và Xác Thực Tài Khoản
- **Đăng ký tài khoản:**
  - Người dùng có thể đăng ký với vai trò DONOR, CHARITY, hoặc BENEFICIARY.
  - Xác minh tài khoản qua OTP gửi đến số điện thoại.

- **Xác thực tài khoản CHARITY:**
  - Tổ chức từ thiện cần cung cấp giấy phép hoạt động.
  - Admin kiểm tra và xác thực giấy phép trước khi thay đổi trạng thái thành VERIFIED.

### 2. Quản Lý Chiến Dịch Từ Thiện
- **Tạo chiến dịch mới (CHARITY):**
  - Được Admin xác minh trước khi tạo.
  - Quản lý thông tin chiến dịch như mô tả, mục tiêu, ngân sách, địa điểm và thời gian.

- **Cập nhật và Xóa chiến dịch:**
  - Tổ chức từ thiện có thể chỉnh sửa hoặc xóa chiến dịch dưới quyền quản lý.
  - Hệ thống tự động xử lý các dữ liệu liên quan khi chiến dịch bị xóa.

### 3. Đóng Góp Từ Thiện
- **Xử lý đóng góp:**
  - Tích hợp các phương thức thanh toán như chuyển khoản ngân hàng, Ví điện tử (Momo, VNPAY), và thẻ tín dụng.
  - Cập nhật trạng thái giao dịch dựa trên phản hồi từ cổng thanh toán.

### 4. Theo Dõi và Báo Cáo
- **Quản lý báo cáo:**
  - Cung cấp thông tin tổng quan về số tiền và vật phẩm đã quyên góp, phân phối và số dư còn lại.
  - Hỗ trợ xuất báo cáo chi tiết theo người, ngày, tháng, tổ chức từ thiện, và thiên tai.

### 5. Phản Hồi và Đánh Giá
- **Quản lý phản hồi:**
  - Cho phép người dùng gửi phản hồi và đánh giá về tình hình quyên góp và nhận hỗ trợ.
  - Hiển thị phản hồi để tạo lòng tin từ cộng đồng.

## Công Nghệ Sử Dụng
- **Backend:**
  - Node.js, Express.js, TypeScript, PostgreSQL, TypeORM.

- **Thanh Toán:**
  - ZaloPay API.

- **Công cụ khác:**
  - Nodemon, Docker, Docker Compose, Git, ESLint, Prettier.

## Cài Đặt và Chạy Ứng Dụng

### Yêu Cầu
- **Node.js** v14+
- **npm** hoặc **yarn**
- **PostgreSQL**
- **Docker** & **Docker Compose**

### Bước 1: Clone Repository
```sh
git clone https://github.com/CaoQuocViet/giveback-server.git
```

### Bước 2: Cài Đặt Dependencies
```sh
cd giveback-server
npm install
# hoặc
yarn install
```

### Bước 3: Cấu Hình Môi Trường
Sao chép file .env.example thành .env và cập nhật các biến môi trường cần thiết.
### Bước 4: Khởi Tạo và Phân Mảnh Cơ Sở Dữ Liệu
```sh
npm run migrate
npm run seed
# hoặc
yarn migrate
yarn seed
```

### Bước 5: Chạy Ứng Dụng
```sh
npm run dev
# hoặc
yarn dev
```

- Ứng dụng sẽ chạy trên http://localhost:4000.

## Đóng Góp
- Chúng tôi rất hoan nghênh mọi đóng góp từ cộng đồng. Để đóng góp:

## Fork repository.
- Tạo một nhánh mới cho tính năng hoặc sửa lỗi bạn muốn thêm.
- Gửi Pull Request với mô tả chi tiết về các thay đổi của bạn.

## License
- Dự án này được cấp phép theo giấy phép MIT. Xem file LICENSE để biết thêm chi tiết.

## Liên Hệ
- Đối với bất kỳ câu hỏi hoặc hỗ trợ nào, vui lòng liên hệ qua email: vietcao10@gmail.com.

## Liên Kết Repository
- Frontend: https://github.com/CaoQuocViet/giveback
- Backend: https://github.com/CaoQuocViet/giveback-server