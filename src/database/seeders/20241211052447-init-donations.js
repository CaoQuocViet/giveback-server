'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Thêm dữ liệu cho bảng Donations
    await queryInterface.bulkInsert('Donations', [
      // 10 khoản quyên góp đầu tiên
      {
        id: 'donation_001',
        campaign_id: 'campaign_act1_1',
        donor_id: 'donor_001',
        payment_method_id: 'payment_method_1',
        amount: 15000000,
        note: "Hỗ trợ cho chiến dịch cứu trợ sạt lở miền núi.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_002',
        campaign_id: 'campaign_act1_1',
        donor_id: 'donor_001',
        payment_method_id: 'payment_method_1',
        amount: 20000000,
        note: "Hỗ trợ cho người dân vùng sạt lở.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_003',
        campaign_id: 'campaign_act1_1',
        donor_id: 'donor_001',
        payment_method_id: 'payment_method_1',
        amount: 20000000,
        note: "Hỗ trợ cho người dân vùng sạt lở.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_004',
        campaign_id: 'campaign_act1_1',
        donor_id: 'donor_002',
        payment_method_id: 'payment_method_1',
        amount: 20000000,
        note: "Đóng góp cho người dân vùng sạt lở.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_005',
        campaign_id: 'campaign_act1_1',
        donor_id: 'donor_002',
        payment_method_id: 'payment_method_1',
        amount: 20000000,
        note: "Đóng góp cho người dân vùng sạt lở.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_006',
        campaign_id: 'campaign_act1_1',
        donor_id: 'donor_002',
        payment_method_id: 'payment_method_1',
        amount: 20000000,
        note: "Đóng góp cho người dân vùng sạt lở.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_007',
        campaign_id: 'campaign_act1_1',
        donor_id: 'donor_003',
        payment_method_id: 'payment_method_1',
        amount: 25000000,
        note: "Giúp đỡ người dân khắc phục hậu quả.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_008',
        campaign_id: 'campaign_act1_1',
        donor_id: 'donor_003',
        payment_method_id: 'payment_method_1',
        amount: 20000000,
        note: "Giúp đỡ người dân khắc phục hậu quả.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_009',
        campaign_id: 'campaign_act1_1',
        donor_id: 'donor_003',
        payment_method_id: 'payment_method_1',
        amount: 20000000,
        note: "Giúp đỡ người dân khắc phục hậu quả.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_010',
        campaign_id: 'campaign_act1_1',
        donor_id: 'donor_004',
        payment_method_id: 'payment_method_1',
        amount: 20000000,
        note: "Đóng góp cho các hộ dân bị ảnh hưởng.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      // 10 khoản quyên góp tiếp theo
      {
        id: 'donation_011',
        campaign_id: 'campaign_act1_1',
        donor_id: 'donor_004',
        payment_method_id: 'payment_method_1',
        amount: 20000000,
        note: "Đóng góp cho các hộ dân bị ảnh hưởng.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_012',
        campaign_id: 'campaign_act1_1',
        donor_id: 'donor_004',
        payment_method_id: 'payment_method_1',
        amount: 20000000,
        note: "Đóng góp cho các hộ dân bị ảnh hưởng.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_013',
        campaign_id: 'campaign_act1_1',
        donor_id: 'donor_005',
        payment_method_id: 'payment_method_1',
        amount: 15000000,
        note: "Hỗ trợ cho người dân vùng sạt lở.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_014',
        campaign_id: 'campaign_act1_1',
        donor_id: 'donor_005',
        payment_method_id: 'payment_method_1',
        amount: 20000000,
        note: "Hỗ trợ cho người dân vùng sạt lở.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_015',
        campaign_id: 'campaign_act1_1',
        donor_id: 'donor_005',
        payment_method_id: 'payment_method_1',
        amount: 20000000,
        note: "Hỗ trợ cho người dân vùng sạt lở.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_016',
        campaign_id: 'campaign_act1_1',
        donor_id: 'donor_006',
        payment_method_id: 'payment_method_1',
        amount: 20000000,
        note: "Đóng góp cho người dân vùng sạt lở.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_017',
        campaign_id: 'campaign_act1_1',
        donor_id: 'donor_007',
        payment_method_id: 'payment_method_1',
        amount: 15000000,
        note: "Hỗ trợ cho người dân vùng sạt lở.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_018',
        campaign_id: 'campaign_act1_1',
        donor_id: 'donor_008',
        payment_method_id: 'payment_method_1',
        amount: 20000000,
        note: "Đóng góp cho người dân vùng sạt lở.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_019',
        campaign_id: 'campaign_act1_1',
        donor_id: 'donor_009',
        payment_method_id: 'payment_method_1',
        amount: 20000000,
        note: "Hỗ trợ cho người dân vùng sạt lở.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_020',
        campaign_id: 'campaign_act1_1',
        donor_id: 'donor_010',
        payment_method_id: 'payment_method_1',
        amount: 20000000,
        note: "Hỗ trợ cho người dân vùng sạt lở.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_021',
        campaign_id: 'campaign_act2_1',
        donor_id: 'donor_001',
        payment_method_id: 'payment_method_1',
        amount: 12000000,
        note: "Hỗ trợ cho chiến dịch cứu trợ động đất.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_022',
        campaign_id: 'campaign_act2_1',
        donor_id: 'donor_001',
        payment_method_id: 'payment_method_1',
        amount: 15000000,
        note: "Hỗ trợ cho chiến dịch cứu trợ động đất.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_023',
        campaign_id: 'campaign_act2_1',
        donor_id: 'donor_001',
        payment_method_id: 'payment_method_1',
        amount: 13000000,
        note: "Hỗ trợ cho chiến dịch cứu trợ động đất.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_024',
        campaign_id: 'campaign_act2_1',
        donor_id: 'donor_002',
        payment_method_id: 'payment_method_1',
        amount: 14000000,
        note: "Đóng góp cho người dân bị ảnh hưởng bởi động đất.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_025',
        campaign_id: 'campaign_act2_1',
        donor_id: 'donor_002',
        payment_method_id: 'payment_method_1',
        amount: 15000000,
        note: "Đóng góp cho người dân bị ảnh hưởng bởi động đất.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_026',
        campaign_id: 'campaign_act2_1',
        donor_id: 'donor_002',
        payment_method_id: 'payment_method_1',
        amount: 12000000,
        note: "Đóng góp cho người dân bị ảnh hưởng bởi động đất.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_027',
        campaign_id: 'campaign_act2_1',
        donor_id: 'donor_003',
        payment_method_id: 'payment_method_1',
        amount: 13000000,
        note: "Giúp đỡ người dân khắc phục hậu quả động đất.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_028',
        campaign_id: 'campaign_act2_1',
        donor_id: 'donor_003',
        payment_method_id: 'payment_method_1',
        amount: 12000000,
        note: "Giúp đỡ người dân khắc phục hậu quả động đất.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_029',
        campaign_id: 'campaign_act2_1',
        donor_id: 'donor_003',
        payment_method_id: 'payment_method_1',
        amount: 13000000,
        note: "Giúp đỡ người dân khắc phục hậu quả động đất.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_030',
        campaign_id: 'campaign_act2_1',
        donor_id: 'donor_004',
        payment_method_id: 'payment_method_1',
        amount: 12000000,
        note: "Đóng góp cho các hộ dân bị ảnh hưởng.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_031',
        campaign_id: 'campaign_act2_1',
        donor_id: 'donor_004',
        payment_method_id: 'payment_method_1',
        amount: 12000000,
        note: "Đóng góp cho các hộ dân bị ảnh hưởng.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_032',
        campaign_id: 'campaign_act2_1',
        donor_id: 'donor_004',
        payment_method_id: 'payment_method_1',
        amount: 13000000,
        note: "Đóng góp cho các hộ dân bị ảnh hưởng.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_033',
        campaign_id: 'campaign_act2_1',
        donor_id: 'donor_005',
        payment_method_id: 'payment_method_1',
        amount: 12000000,
        note: "Hỗ trợ cho người dân vùng động đất.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_034',
        campaign_id: 'campaign_act2_1',
        donor_id: 'donor_005',
        payment_method_id: 'payment_method_1',
        amount: 12000000,
        note: "Hỗ trợ cho người dân vùng động đất.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_035',
        campaign_id: 'campaign_act2_1',
        donor_id: 'donor_005',
        payment_method_id: 'payment_method_1',
        amount: 13000000,
        note: "Hỗ trợ cho người dân vùng động đất.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_036',
        campaign_id: 'campaign_act2_1',
        donor_id: 'donor_006',
        payment_method_id: 'payment_method_1',
        amount: 12000000,
        note: "Hỗ trợ cho người dân vùng động đất.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_037',
        campaign_id: 'campaign_act2_1',
        donor_id: 'donor_007',
        payment_method_id: 'payment_method_1',
        amount: 13000000,
        note: "Hỗ trợ cho người dân vùng động đất.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_038',
        campaign_id: 'campaign_act2_1',
        donor_id: 'donor_008',
        payment_method_id: 'payment_method_1',
        amount: 12000000,
        note: "Hỗ trợ cho người dân vùng động đất.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_039',
        campaign_id: 'campaign_act2_1',
        donor_id: 'donor_009',
        payment_method_id: 'payment_method_1',
        amount: 12000000,
        note: "Hỗ trợ cho người dân vùng động đất.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      },
      {
        id: 'donation_040',
        campaign_id: 'campaign_act2_1',
        donor_id: 'donor_010',
        payment_method_id: 'payment_method_1',
        amount: 12000000,
        note: "Hỗ trợ cho người dân vùng động đất.",
        status: 'SUCCESS',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // Xóa dữ liệu trong bảng Donations
    await queryInterface.bulkDelete('Donations', null, {});
  }
};
