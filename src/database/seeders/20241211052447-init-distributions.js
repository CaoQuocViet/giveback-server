'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Thêm dữ liệu cho bảng Distributions
    await queryInterface.bulkInsert('Distributions', [
      {
        id: 'distribution_001',
        campaign_id: 'campaign_act1_1',
        title: "Cứu trợ lương thực cho người dân vùng sâu",
        budget: 80000000,
        distribution_date: new Date('2024-02-01T00:00:00Z'),
        province: "Hà Giang",
        district: "Huyện Mèo Vạc",
        ward: "Xã Thượng Sơn",
        address: "Thôn Lùng Vài, Xã Thượng Sơn",
        beneficiary_count: 300,
        description: "Cung cấp lương thực cho các hộ dân bị ảnh hưởng bởi thiên tai.",
        proof_images: "distributions/distribute1.png",
        representative_name: "charity_act1",
        relief_date: new Date('2024-02-05T00:00:00Z')
      },
      {
        id: 'distribution_002',
        campaign_id: 'campaign_act1_1',
        title: "Cứu trợ nước sạch cho người dân",
        budget: 60000000,
        distribution_date: new Date('2024-02-10T00:00:00Z'),
        province: "Lào Cai",
        district: "Huyện Sa Pa",
        ward: "Xã Tả Van",
        address: "Thôn Tả Van, Xã Tả Van",
        beneficiary_count: 250,
        description: "Cung cấp nước sạch cho các hộ dân.",
        proof_images: "distributions/distribute2.png",
        representative_name: "charity_act1",
        relief_date: new Date('2024-02-15T00:00:00Z')
      },
      {
        id: 'distribution_003',
        campaign_id: 'campaign_act1_1',
        title: "Cứu trợ thuốc men cho người dân",
        budget: 50000000,
        distribution_date: new Date('2024-02-20T00:00:00Z'),
        province: "Điện Biên",
        district: "Huyện Mường Nhé",
        ward: "Xã Mường Nhé",
        address: "Thôn Mường Nhé, Xã Mường Nhé",
        beneficiary_count: 200,
        description: "Cung cấp thuốc men cho các hộ dân.",
        proof_images: "distributions/distribute3.png",
        representative_name: "charity_act1",
        relief_date: new Date('2024-02-25T00:00:00Z')
      },
      {
        id: 'distribution_004',
        campaign_id: 'campaign_act1_1',
        title: "Cứu trợ quần áo cho người dân",
        budget: 40000000,
        distribution_date: new Date('2024-03-01T00:00:00Z'),
        province: "Kon Tum",
        district: "Huyện Đăk Glei",
        ward: "Xã Đăk Nhoong",
        address: "Thôn Đăk Nhoong, Xã Đăk Nhoong",
        beneficiary_count: 150,
        description: "Cung cấp quần áo cho các hộ dân.",
        proof_images: "distributions/distribute4.png",
        representative_name: "charity_act1",
        relief_date: new Date('2024-03-05T00:00:00Z')
      },
      {
        id: 'distribution_005',
        campaign_id: 'campaign_act1_1',
        title: "Cứu trợ đồ dùng học tập cho trẻ em",
        budget: 90000000,
        distribution_date: new Date('2024-03-10T00:00:00Z'),
        province: "Ninh Thuận",
        district: "Huyện Ninh Hải",
        ward: "Xã Nhơn Hải",
        address: "Thôn Nhơn Hải, Xã Nhơn Hải",
        beneficiary_count: 100,
        description: "Cung cấp đồ dùng học tập cho trẻ em.",
        proof_images: "distributions/distribute5.png",
        representative_name: "charity_act1",
        relief_date: new Date('2024-03-15T00:00:00Z')
      },
      {
        id: 'distribution_006',
        campaign_id: 'campaign_act2_1',
        title: "Cứu trợ lương thực cho người dân vùng động đất",
        budget: 70000000,
        distribution_date: new Date('2024-02-01T00:00:00Z'),
        province: "Lai Châu",
        district: "Huyện Nậm Nhùn",
        ward: "Xã Nậm Ban",
        address: "Thôn Nậm Ngà, Xã Nậm Ban",
        beneficiary_count: 300,
        description: "Cung cấp lương thực cho các hộ dân bị ảnh hưởng bởi động đất.",
        proof_images: "distributions/distribute6.png",
        representative_name: "charity_act2",
        relief_date: new Date('2024-02-05T00:00:00Z')
      },
      {
        id: 'distribution_007',
        campaign_id: 'campaign_act2_1',
        title: "Cứu trợ nước sạch cho người dân",
        budget: 30000000,
        distribution_date: new Date('2024-02-10T00:00:00Z'),
        province: "Lai Châu",
        district: "Huyện Mường Tè",
        ward: "Xã Mường Tè",
        address: "Thôn Mường Tè, Xã Mường Tè",
        beneficiary_count: 250,
        description: "Cung cấp nước sạch cho các hộ dân.",
        proof_images: "distributions/distribute7.png",
        representative_name: "charity_act2",
        relief_date: new Date('2024-02-15T00:00:00Z')
      },
      {
        id: 'distribution_008',
        campaign_id: 'campaign_act2_1',
        title: "Cứu trợ thuốc men cho người dân",
        budget: 40000000,
        distribution_date: new Date('2024-02-20T00:00:00Z'),
        province: "Lai Châu",
        district: "Huyện Nậm Nhùn",
        ward: "Xã Nậm Ban",
        address: "Thôn Nậm Ban, Xã Nậm Ban",
        beneficiary_count: 200,
        description: "Cung cấp thuốc men cho các hộ dân.",
        proof_images: "distributions/distribute8.png",
        representative_name: "charity_act2",
        relief_date: new Date('2024-02-25T00:00:00Z')
      },
      {
        id: 'distribution_009',
        campaign_id: 'campaign_act2_1',
        title: "Cứu trợ quần áo cho người dân",
        budget: 30000000,
        distribution_date: new Date('2024-03-01T00:00:00Z'),
        province: "Lai Châu",
        district: "Huyện Nậm Nhùn",
        ward: "Xã Nậm Ban",
        address: "Thôn Nậm Ban, Xã Nậm Ban",
        beneficiary_count: 150,
        description: "Cung cấp quần áo cho các hộ dân.",
        proof_images: "distributions/distribute9.png",
        representative_name: "charity_act2",
        relief_date: new Date('2024-03-05T00:00:00Z')
      },
      {
        id: 'distribution_010',
        campaign_id: 'campaign_act2_1',
        title: "Cứu trợ đồ dùng học tập cho trẻ em",
        budget: 30000000,
        distribution_date: new Date('2024-03-10T00:00:00Z'),
        province: "Lai Châu",
        district: "Huyện Nậm Nhùn",
        ward: "Xã Nậm Ban",
        address: "Thôn Nậm Ban, Xã Nậm Ban",
        beneficiary_count: 100,
        description: "Cung cấp đồ dùng học tập cho trẻ em.",
        proof_images: "distributions/distribute1.png", // Lặp lại hình ảnh theo thứ tự
        representative_name: "charity_act2",
        relief_date: new Date('2024-03-15T00:00:00Z')
      }
    ], {});    
  },

  async down (queryInterface, Sequelize) {
    // Xóa dữ liệu trong bảng Distributions
    await queryInterface.bulkDelete('Distributions', null, {});
  }
};
