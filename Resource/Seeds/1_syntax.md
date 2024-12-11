# Init seeds:
npx sequelize-cli seed:generate --name init-users
npx sequelize-cli seed:generate --name init-admins
npx sequelize-cli seed:generate --name init-charities
npx sequelize-cli seed:generate --name init-campaigns
npx sequelize-cli seed:generate --name init-payment-methods
npx sequelize-cli seed:generate --name init-donations
npx sequelize-cli seed:generate --name init-distributions
npx sequelize-cli seed:generate --name init-comments
npx sequelize-cli seed:generate --name init-otp-codes
npx sequelize-cli seed:generate --name init-password-resets

# Run seeds:
npx sequelize-cli db:seed:all

# Undo seeds:
npx sequelize-cli db:seed:undo:all

# Chạy tất cả seeds
npx sequelize-cli db:seed:all

# Tạo seed mới
npx sequelize-cli seed:generate --name add-new-data

# Chạy seed cụ thể
npx sequelize-cli db:seed --seed name-of-seed-file

# Rollback seed gần nhất
npx sequelize-cli db:seed:undo

# Rollback tất cả seeds
npx sequelize-cli db:seed:undo:all

# Thứ tự chạy seeds (quan trọng):
1. init-users (tạo tất cả users bao gồm admin, donors, beneficiaries và charities)
2. init-admins (tạo thông tin bổ sung cho admin)
3. init-charities (tạo thông tin bổ sung cho charities)
4. init-campaigns (tạo campaigns cho các charities đã verify)
5. init-payment-methods (tạo các phương thức thanh toán)
6. init-donations (tạo donations từ donors cho campaigns)
7. init-distributions (tạo distributions từ charities cho beneficiaries)
8. init-comments (tạo comments cho campaigns)
9. init-otp-codes (tạo mã OTP mẫu)
10. init-password-resets (tạo dữ liệu reset password mẫu)

# Lưu ý:
- Cần chạy đúng thứ tự vì có quan hệ phụ thuộc giữa các bảng
- Mật khẩu mặc định cho tất cả users: 123456789000
- Dữ liệu seeds được thiết kế để demo đầy đủ các tính năng của hệ thống
- Khi undo seeds cũng cần chạy theo thứ tự ngược lại để tránh lỗi khóa ngoại
