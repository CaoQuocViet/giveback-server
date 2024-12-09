# Cấu trúc chọn địa chỉ hành chính 3 cấp

## Mô tả
Cấu trúc chọn địa chỉ hành chính 3 cấp (tỉnh/thành phố - quận/huyện - phường/xã) được sử dụng trong các form có yêu cầu nhập địa chỉ.

## Thành phần
1. Select box Tỉnh/Thành phố
- Hiển thị danh sách các tỉnh/thành phố
- Khi chọn sẽ load danh sách quận/huyện tương ứng

2. Select box Quận/Huyện 
- Hiển thị danh sách quận/huyện của tỉnh/thành phố đã chọn
- Disabled cho đến khi chọn tỉnh/thành phố
- Khi chọn sẽ load danh sách phường/xã tương ứng

3. Select box Phường/Xã
- Hiển thị danh sách phường/xã của quận/huyện đã chọn  
- Disabled cho đến khi chọn quận/huyện

## Sử dụng
- Form đăng ký tài khoản
- Form tạo/chỉnh sửa chiến dịch
- Form tạo khoản cứu trợ
- Form cập nhật thông tin cá nhân/tổ chức

## Dữ liệu
Sử dụng API của hệ thống để lấy danh sách các đơn vị hành chính:
- GET /api/provinces - Lấy danh sách tỉnh/thành phố
- GET /api/districts?province_id={id} - Lấy danh sách quận/huyện theo tỉnh/thành phố
- GET /api/wards?district_id={id} - Lấy danh sách phường/xã theo quận/huyện

## Xử lý
1. Khi component mount:
- Load danh sách tỉnh/thành phố
- Reset các select box quận/huyện và phường/xã về trạng thái disabled

2. Khi chọn tỉnh/thành phố:
- Load danh sách quận/huyện tương ứng
- Enable select box quận/huyện
- Reset select box phường/xã về trạng thái disabled
- Clear giá trị đã chọn của quận/huyện và phường/xã

3. Khi chọn quận/huyện:
- Load danh sách phường/xã tương ứng  
- Enable select box phường/xã
- Clear giá trị đã chọn của phường/xã

4. Khi chọn phường/xã:
- Cập nhật state với đầy đủ thông tin địa chỉ đã chọn
