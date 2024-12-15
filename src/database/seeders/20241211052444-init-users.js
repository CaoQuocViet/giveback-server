'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Hash password một lần cho tất cả users
    const hashedPassword = await bcrypt.hash('123456789000', 10);

    // Tạo mảng chứa dữ liệu users
    const users = [
      // System Admin
      {
        id: 'admin_001',
        full_name: 'Nguyễn Quản Trị',
        email: 'admin@giveback',
        phone: '0900000001',
        password: hashedPassword,
        role: 'ADMIN',
        otp_verified: true,
        profile_image: 'profiles/avatar1.png',
        province: 'Hồ Chí Minh',
        district: 'Quận 1',
        ward: 'Phường Bến Nghé',
        address: '123 Đường Lê Lợi',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        phone_verified_at: '2024-01-01T00:00:00Z'
      },
      // Donor 1
      {
        id: 'donor_001',
        full_name: 'Trần Bảo An',
        email: 'baoan@giveback.don',
        phone: '0900000002',
        password: hashedPassword,
        role: 'DONOR',
        otp_verified: true,
        profile_image: 'profiles/avatar2.png',
        province: 'Hồ Chí Minh',
        district: 'Quận 1',
        ward: 'Phường Cầu Ông Lãnh',
        address: '45 Đường Trần Hưng Đạo',
        created_at: '2024-01-02T00:00:00Z',
        updated_at: '2024-01-02T00:00:00Z',
        phone_verified_at: '2024-01-02T00:00:00Z'
      },
      // Donor 2
      {
        id: 'donor_002',
        full_name: 'Lê Minh Tâm',
        email: 'minhtam@giveback.don',
        phone: '0900000003',
        password: hashedPassword,
        role: 'DONOR',
        otp_verified: true,
        profile_image: 'profiles/avatar3.png',
        province: 'Hồ Chí Minh',
        district: 'Quận 1',
        ward: 'Phường Bến Nghé',
        address: '67 Đường Nguyễn Huệ',
        created_at: '2024-01-03T00:00:00Z',
        updated_at: '2024-01-03T00:00:00Z',
        phone_verified_at: '2024-01-03T00:00:00Z'
      },
      // Donor 3
      {
        id: 'donor_003',
        full_name: 'Phạm Thanh Hà',
        email: 'thanhha@giveback.don',
        phone: '0900000004',
        password: hashedPassword,
        role: 'DONOR',
        otp_verified: true,
        profile_image: 'profiles/avatar4.png',
        province: 'Hồ Chí Minh',
        district: 'Quận 1',
        ward: 'Phường Bến Thành',
        address: '89 Đường Lý Tự Trọng',
        created_at: '2024-01-04T00:00:00Z',
        updated_at: '2024-01-04T00:00:00Z',
        phone_verified_at: '2024-01-04T00:00:00Z'
      },
      // Donor 4
      {
        id: 'donor_004',
        full_name: 'Nguyễn Thị Hạnh',
        email: 'thihanh@giveback.don',
        phone: '0900000005',
        password: hashedPassword,
        role: 'DONOR',
        otp_verified: true,
        profile_image: 'profiles/avatar5.png',
        province: 'Hồ Chí Minh',
        district: 'Quận 1',
        ward: 'Phường Bến Thành',
        address: '91 Đường Nguyễn Du',
        created_at: '2024-01-05T00:00:00Z',
        updated_at: '2024-01-05T00:00:00Z',
        phone_verified_at: '2024-01-05T00:00:00Z'
      },
      // Donor 5
      {
        id: 'donor_005',
        full_name: 'Lý Văn Phúc',
        email: 'vanphuc@giveback.don',
        phone: '0900000006',
        password: hashedPassword,
        role: 'DONOR',
        otp_verified: true,
        profile_image: 'profiles/avatar6.png',
        province: 'Hồ Chí Minh',
        district: 'Quận 1',
        ward: 'Phường Bến Thành',
        address: '92 Đường Pasteur',
        created_at: '2024-01-06T00:00:00Z',
        updated_at: '2024-01-06T00:00:00Z',
        phone_verified_at: '2024-01-06T00:00:00Z'
      },
      // Donor 6
      {
        id: 'donor_006',
        full_name: 'Trịnh Minh Anh',
        email: 'minhanh@giveback.don',
        phone: '0900000007',
        password: hashedPassword,
        role: 'DONOR',
        otp_verified: true,
        profile_image: 'profiles/avatar7.png',
        province: 'Hồ Chí Minh',
        district: 'Quận 1',
        ward: 'Phường Bến Thành',
        address: '93 Đường Mạc Thị Bưởi',
        created_at: '2024-01-07T00:00:00Z',
        updated_at: '2024-01-07T00:00:00Z',
        phone_verified_at: '2024-01-07T00:00:00Z'
      },
      // Donor 7 (ẩn danh)
      {
        id: 'donor_007',
        full_name: 'Hoàng Minh Đức',
        email: 'minhduc@giveback.don',
        phone: '0900000008',
        password: hashedPassword,
        role: 'DONOR',
        otp_verified: true,
        profile_image: 'profiles/avatar8.png',
        province: 'Hồ Chí Minh',
        district: 'Quận 3',
        ward: 'Phường 6',
        address: '234 Đường Cách Mạng Tháng 8',
        created_at: '2024-01-08T00:00:00Z',
        updated_at: '2024-01-08T00:00:00Z',
        phone_verified_at: '2024-01-08T00:00:00Z'
      },
      // Donor 8 (ẩn danh)
      {
        id: 'donor_008',
        full_name: 'Vũ Thị Mai',
        email: 'vumai@giveback.don',
        phone: '0900000009',
        password: hashedPassword,
        role: 'DONOR',
        otp_verified: true,
        profile_image: 'profiles/avatar9.png',
        province: 'Hồ Chí Minh',
        district: 'Quận 3',
        ward: 'Phường 6',
        address: '56 Đường Võ Văn Tần',
        created_at: '2024-01-09T00:00:00Z',
        updated_at: '2024-01-09T00:00:00Z',
        phone_verified_at: '2024-01-09T00:00:00Z'
      },
      // Donor 9 (chưa có đóng góp)
      {
        id: 'donor_009',
        full_name: 'Đặng Minh Quân',
        email: 'minhquan@giveback.don',
        phone: '0900000010',
        password: hashedPassword,
        role: 'DONOR',
        otp_verified: true,
        profile_image: 'profiles/avatar10.png',
        province: 'Hồ Chí Minh',
        district: 'Quận 3',
        ward: 'Phường 8',
        address: '78 Đường Nam Kỳ Khởi Nghĩa',
        created_at: '2024-01-10T00:00:00Z',
        updated_at: '2024-01-10T00:00:00Z',
        phone_verified_at: '2024-01-10T00:00:00Z'
      },
      // Donor 10 (chưa có đóng góp)
      {
        id: 'donor_010',
        full_name: 'Bùi Thị Ngọc',
        email: 'buingoc@giveback.don',
        phone: '0900000011',
        password: hashedPassword,
        role: 'DONOR',
        otp_verified: true,
        profile_image: 'profiles/avatar11.png',
        province: 'Hồ Chí Minh',
        district: 'Quận 1',
        ward: 'Phường Đa Kao',
        address: '90 Đường Điện Biên Phủ',
        created_at: '2024-01-11T00:00:00Z',
        updated_at: '2024-01-11T00:00:00Z',
        phone_verified_at: '2024-01-11T00:00:00Z'
      },
      // Beneficiary 1
      {
        id: 'ben_001',
        full_name: 'Nguyễn Văn Hùng',
        email: 'vanhung@giveback.ben',
        phone: '0900000012',
        password: hashedPassword,
        role: 'BENEFICIARY',
        otp_verified: true,
        profile_image: 'profiles/avatar12.png',
        province: 'Lào Cai',
        district: 'Huyện Sa Pa',
        ward: 'Xã Tả Van',
        address: 'Thôn Sín Chải A',
        created_at: '2024-01-15T00:00:00Z',
        updated_at: '2024-01-15T00:00:00Z',
        phone_verified_at: '2024-01-15T00:00:00Z'
      },
      // Beneficiary 2
      {
        id: 'ben_002',
        full_name: 'Trần Thị Hiền',
        email: 'thihien@giveback.ben',
        phone: '0900000013',
        password: hashedPassword,
        role: 'BENEFICIARY',
        otp_verified: true,
        profile_image: 'profiles/avatar1.png',
        province: 'Lào Cai',
        district: 'Huyện Sa Pa',
        ward: 'Xã Tả Van',
        address: 'Thôn Sín Chải B',
        created_at: '2024-01-16T00:00:00Z',
        updated_at: '2024-01-16T00:00:00Z',
        phone_verified_at: '2024-01-16T00:00:00Z'
      },
      // Beneficiary 3
      {
        id: 'ben_003',
        full_name: 'Lê Văn Nam',
        email: 'vannam@giveback.ben',
        phone: '0900000014',
        password: hashedPassword,
        role: 'BENEFICIARY',
        otp_verified: true,
        profile_image: 'profiles/avatar2.png',
        province: 'Lai Châu',
        district: 'Huyện Nậm Nhùn',
        ward: 'Xã Nậm Nhùn',
        address: 'Bản Nậm Lúc',
        created_at: '2024-01-17T00:00:00Z',
        updated_at: '2024-01-17T00:00:00Z',
        phone_verified_at: '2024-01-17T00:00:00Z'
      },
      // Beneficiary 4
      {
        id: 'ben_004',
        full_name: 'Nguyễn Thị Thắm',
        email: 'thitham@giveback.ben',
        phone: '0900000015',
        password: hashedPassword,
        role: 'BENEFICIARY',
        otp_verified: true,
        profile_image: 'profiles/avatar3.png',
        province: 'Lai Châu',
        district: 'Huyện Nậm Nhùn',
        ward: 'Xã Nậm Nhùn',
        address: 'Bản Nậm Lúc',
        created_at: '2024-01-18T00:00:00Z',
        updated_at: '2024-01-18T00:00:00Z',
        phone_verified_at: '2024-01-18T00:00:00Z'
      },    
      // Charity 1 (Đã xác thực)
      {
        id: 'charity_act1',
        full_name: 'Nguyễn Thị Phương (Đại diện)',
        email: 'anhduong@giveback.cha',
        phone: '0900000016',
        password: hashedPassword,
        role: 'CHARITY',
        otp_verified: true,
        profile_image: 'profiles/avatar13.png',
        province: 'Hồ Chí Minh',
        district: 'Quận 3',
        ward: 'Phường 1',
        address: '123 Đường Điện Biên Phủ',
        created_at: '2024-01-20T00:00:00Z',
        updated_at: '2024-01-20T00:00:00Z',
        phone_verified_at: '2024-01-20T00:00:00Z'
      },
      // Charity 2 (Đã xác thực)
      {
        id: 'charity_act2',
        full_name: 'Trần Văn Đức (Đại diện)',
        email: 'hyvong@giveback.cha',
        phone: '0900000017',
        password: hashedPassword,
        role: 'CHARITY',
        otp_verified: true,
        profile_image: 'profiles/avatar14.png',
        province: 'Hồ Chí Minh',
        district: 'Quận 3',
        ward: 'Phường 7',
        address: '78 Đường Võ Thị Sáu',
        created_at: '2024-01-21T00:00:00Z',
        updated_at: '2024-01-21T00:00:00Z',
        phone_verified_at: '2024-01-21T00:00:00Z'
      },
      // Charity 3 (Đã xác thực)
      {
        id: 'charity_act3',
        full_name: 'Lê Thị Hoa (Đại diện)',
        email: 'nhanai@giveback.cha',
        phone: '0900000018',
        password: hashedPassword,
        role: 'CHARITY',
        otp_verified: true,
        profile_image: 'profiles/avatar15.png',
        province: 'Hồ Chí Minh',
        district: 'Quận 3',
        ward: 'Phường 7',
        address: '90 Đường Bà Huyện Thanh Quan',
        created_at: '2024-01-22T00:00:00Z',
        updated_at: '2024-01-22T00:00:00Z',
        phone_verified_at: '2024-01-22T00:00:00Z'
      },
      // Charity 4 (Đã xác thực)
      {
        id: 'charity_act4',
        full_name: 'Phạm Văn Tuấn (Đại diện)',
        email: 'traitim@giveback.cha',
        phone: '0900000019',
        password: hashedPassword,
        role: 'CHARITY',
        otp_verified: true,
        profile_image: 'profiles/avatar16.png',
        province: 'Hồ Chí Minh',
        district: 'Quận 3',
        ward: 'Phường 7',
        address: '123 Đường Trần Quốc Thảo',
        created_at: '2024-01-23T00:00:00Z',
        updated_at: '2024-01-23T00:00:00Z',
        phone_verified_at: '2024-01-23T00:00:00Z'
      },
      // Charity 5 (Đã xác thực)
      {
        id: 'charity_act5',
        full_name: 'Hoàng Thị Thảo (Đại diện)',
        email: 'maiam@giveback.cha',
        phone: '0900000020',
        password: hashedPassword,
        role: 'CHARITY',
        otp_verified: true,
        profile_image: 'profiles/avatar17.png',
        province: 'Hồ Chí Minh',
        district: 'Quận 3',
        ward: 'Phường 5',
        address: '45 Đường Nguyễn Đình Chiểu',
        created_at: '2024-01-24T00:00:00Z',
        updated_at: '2024-01-24T00:00:00Z',
        phone_verified_at: '2024-01-24T00:00:00Z'
      },
      // Charity 6 (Đã xác thực)
      {
        id: 'charity_act6',
        full_name: 'Lê Thị Hoa (Đại diện)',
        email: 'anhsang@giveback.cha',
        phone: '0900000021',
        password: hashedPassword,
        role: 'CHARITY',
        otp_verified: true,
        profile_image: 'profiles/avatar18.png',
        province: 'Hồ Chí Minh',
        district: 'Quận 3',
        ward: 'Phường 3',
        address: '67 Đường Trần Quốc Thảo',
        created_at: '2024-01-22T00:00:00Z',
        updated_at: '2024-01-22T00:00:00Z',
        phone_verified_at: '2024-01-22T00:00:00Z'
      },
      // Charity 7 (Đang chờ xác thực)
      {
        id: 'charity_pen1',
        full_name: 'Nguyễn Văn Minh (Đại diện)',
        email: 'maiamtt@giveback.cha',
        phone: '0900000022',
        password: hashedPassword,
        role: 'CHARITY',
        otp_verified: true,
        profile_image: 'profiles/avatar19.png',
        province: 'Hồ Chí Minh',
        district: 'Quận 3',
        ward: 'Phường 4',
        address: '123 Đường Trần Quốc Thảo',
        created_at: '2024-01-23T00:00:00Z',
        updated_at: '2024-01-23T00:00:00Z',
        phone_verified_at: '2024-01-23T00:00:00Z'
      },
      // Charity 8 (Đang chờ xác thực)
      {
        id: 'charity_pen2',
        full_name: 'Hoàng Thị Mai (Đại diện)',
        email: 'vituonglai@giveback.cha',
        phone: '0900000023',
        password: hashedPassword,
        role: 'CHARITY',
        otp_verified: true,
        profile_image: 'profiles/avatar20.png',
        province: 'Hồ Chí Minh',
        district: 'Quận 3',
        ward: 'Phường 5',
        address: '45 Đường Nguyễn Đình Chiểu',
        created_at: '2024-01-24T00:00:00Z',
        updated_at: '2024-01-24T00:00:00Z',
        phone_verified_at: '2024-01-24T00:00:00Z'
      },
      // Charity 9 (Bị từ chối xác thực)
      {
        id: 'charity_rej1',
        full_name: 'Đặng Thị Xuân (Đại diện)',
        email: 'tuonglaixanh@giveback.cha',
        phone: '0900000024',
        password: hashedPassword,
        role: 'CHARITY',
        otp_verified: true,
        profile_image: 'profiles/avatar21.png',
        province: 'Hồ Chí Minh',
        district: 'Quận 3',
        ward: 'Phường 6',
        address: '67 Đường Trần Quốc Thảo',
        created_at: '2024-01-25T00:00:00Z',
        updated_at: '2024-01-25T00:00:00Z',
        phone_verified_at: '2024-01-25T00:00:00Z'
      },
      // Charity 10 (Bị từ chối xác thực)
      {
        id: 'charity_rej2',
        full_name: 'Lê Văn Hòa (Đại diện)',
        email: 'hotrogiaoduc@giveback.cha',
        phone: '0900000025',
        password: hashedPassword,
        role: 'CHARITY',
        otp_verified: true,
        profile_image: 'profiles/avatar22.png', // Lặp lại từ avatar13
        province: 'Hồ Chí Minh',
        district: 'Quận 3',
        ward: 'Phường 6',
        address: '67 Đường Trần Quốc Thảo',
        created_at: '2024-01-26T00:00:00Z',
        updated_at: '2024-01-26T00:00:00Z',
        phone_verified_at: '2024-01-26T00:00:00Z'
      }
    ];
    // Insert tất cả users vào database
    await queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface, Sequelize) {
    // Xóa các users đã tạo
    await queryInterface.bulkDelete('Users', {
      id: [
        'admin_001',
        'donor_001', 'donor_002', 'donor_003', 'donor_004',
        'donor_005', 'donor_006', 'donor_007', 'donor_008', 'donor_009',
        'donor_010',
        'ben_001', 'ben_002', 'ben_003', 'ben_004',
        'charity_act1', 'charity_act2', 'charity_act3', 'charity_act4', 'charity_act5',
        'charity_act6', 'charity_pen1', 'charity_pen2', 'charity_rej1', 'charity_rej2'
      ]
    }, {});
  }
};