'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const comments = [
      // Comments cho campaign_act1_1
      {
        id: 'comment_001',
        campaign_id: 'campaign_act1_1',
        user_id: 'admin_001',
        content: 'Tình hình lũ lụt đang rất nghiêm trọng, cần hỗ trợ khẩn cấp',
        rating: 5,
        role: 'ADMIN',
        created_at: '2024-02-01T08:00:00Z'
      },
      {
        id: 'comment_002',
        campaign_id: 'campaign_act1_1',
        user_id: 'donor_001',
        content: 'Đã ủng hộ và sẽ kêu gọi thêm mọi người tham gia',
        rating: 5,
        role: 'DONOR',
        created_at: '2024-02-01T09:00:00Z'
      },
      {
        id: 'comment_003',
        campaign_id: 'campaign_act1_1',
        user_id: 'donor_002',
        content: 'Rất đau lòng trước hoàn cảnh của bà con vùng lũ',
        rating: 5,
        role: 'DONOR',
        created_at: '2024-02-01T09:30:00Z'
      },
      {
        id: 'comment_004',
        campaign_id: 'campaign_act1_1',
        user_id: 'donor_003',
        content: 'Mong bà con sớm vượt qua khó khăn',
        rating: 5,
        role: 'DONOR',
        created_at: '2024-02-01T10:00:00Z'
      },
      {
        id: 'comment_005',
        campaign_id: 'campaign_act1_1',
        user_id: 'donor_004',
        content: 'Sẽ tiếp tục theo dõi và ủng hộ chiến dịch',
        rating: 5,
        role: 'DONOR',
        created_at: '2024-02-01T10:30:00Z'
      },
      {
        id: 'comment_006',
        campaign_id: 'campaign_act1_1',
        user_id: 'donor_005',
        content: 'Cầu mong mọi người bình an vượt qua thiên tai',
        rating: 5,
        role: 'DONOR',
        created_at: '2024-02-01T11:00:00Z'
      },
      {
        id: 'comment_007',
        campaign_id: 'campaign_act1_1',
        user_id: 'donor_006',
        content: 'Đã chia sẻ thông tin để nhiều người biết đến',
        rating: 5,
        role: 'DONOR',
        created_at: '2024-02-01T11:30:00Z'
      },
      {
        id: 'comment_008',
        campaign_id: 'campaign_act1_1',
        user_id: 'donor_007',
        content: 'Rất ý nghĩa, sẽ tiếp tục ủng hộ',
        rating: 5,
        role: 'DONOR',
        created_at: '2024-02-01T12:00:00Z'
      },
      {
        id: 'comment_009',
        campaign_id: 'campaign_act1_1',
        user_id: 'donor_008',
        content: 'Cùng chung tay giúp đỡ bà con vùng lũ',
        rating: 5,
        role: 'DONOR',
        created_at: '2024-02-01T12:30:00Z'
      },
      {
        id: 'comment_010',
        campaign_id: 'campaign_act1_1',
        user_id: 'donor_009',
        content: 'Mong chiến dịch sớm đạt mục tiêu',
        rating: 5,
        role: 'DONOR',
        created_at: '2024-02-01T13:00:00Z'
      },
      {
        id: 'comment_011',
        campaign_id: 'campaign_act1_1',
        user_id: 'donor_010',
        content: 'Sẽ vận động thêm người tham gia ủng hộ',
        rating: 5,
        role: 'DONOR',
        created_at: '2024-02-01T13:30:00Z'
      },
      {
        id: 'comment_012',
        campaign_id: 'campaign_act1_1',
        user_id: 'ben_001',
        content: 'Cảm ơn sự hỗ trợ kịp thời của quỹ và các nhà hảo tâm',
        rating: 5,
        role: 'BENEFICIARY',
        created_at: '2024-02-01T14:00:00Z'
      },
      {
        id: 'comment_013',
        campaign_id: 'campaign_act1_1',
        user_id: 'ben_002',
        content: 'Rất biết ơn những tấm lòng nhân ái đã giúp đỡ',
        rating: 5,
        role: 'BENEFICIARY',
        created_at: '2024-02-01T14:30:00Z'
      },
      {
        id: 'comment_014',
        campaign_id: 'campaign_act1_1',
        user_id: 'ben_003',
        content: 'Nhờ có sự giúp đỡ, gia đình đã có chỗ ở tạm',
        rating: 5,
        role: 'BENEFICIARY',
        created_at: '2024-02-01T15:00:00Z'
      },
      {
        id: 'comment_015',
        campaign_id: 'campaign_act1_1',
        user_id: 'ben_004',
        content: 'Xin cảm ơn tất cả mọi người đã quan tâm giúp đỡ',
        rating: 5,
        role: 'BENEFICIARY',
        created_at: '2024-02-01T15:30:00Z'
      },
      // Comments cho campaign_act2_1
      {
        id: 'comment_016',
        campaign_id: 'campaign_act2_1',
        user_id: 'admin_001',
        content: 'Tình hình hạn hán nghiêm trọng, cần hỗ trợ khẩn cấp',
        rating: 5,
        role: 'ADMIN',
        created_at: '2024-02-15T08:00:00Z'
      },
      {
        id: 'comment_017',
        campaign_id: 'campaign_act2_1',
        user_id: 'donor_001',
        content: 'Đã ủng hộ và sẽ tiếp tục theo dõi chiến dịch',
        rating: 5,
        role: 'DONOR',
        created_at: '2024-02-15T09:00:00Z'
      },
      {
        id: 'comment_018',
        campaign_id: 'campaign_act2_1',
        user_id: 'donor_002',
        content: 'Rất đồng cảm với khó khăn của bà con nông dân',
        rating: 5,
        role: 'DONOR',
        created_at: '2024-02-15T09:30:00Z'
      },
      {
        id: 'comment_019',
        campaign_id: 'campaign_act2_1',
        user_id: 'donor_003',
        content: 'Mong dự án sớm giúp được nhiều người dân',
        rating: 5,
        role: 'DONOR',
        created_at: '2024-02-15T10:00:00Z'
      },
      {
        id: 'comment_020',
        campaign_id: 'campaign_act2_1',
        user_id: 'donor_004',
        content: 'Sẽ tiếp tục ủng hộ chiến dịch này',
        rating: 5,
        role: 'DONOR',
        created_at: '2024-02-15T10:30:00Z'
      },
      {
        id: 'comment_021',
        campaign_id: 'campaign_act2_1',
        user_id: 'donor_005',
        content: 'Rất ý nghĩa, sẽ chia sẻ để nhiều người biết',
        rating: 5,
        role: 'DONOR',
        created_at: '2024-02-15T11:00:00Z'
      },
      {
        id: 'comment_022',
        campaign_id: 'campaign_act2_1',
        user_id: 'donor_006',
        content: 'Cùng chung tay giúp đỡ bà con vượt qua hạn hán',
        rating: 5,
        role: 'DONOR',
        created_at: '2024-02-15T11:30:00Z'
      },
      {
        id: 'comment_023',
        campaign_id: 'campaign_act2_1',
        user_id: 'donor_007',
        content: 'Đã chia sẻ thông tin đến bạn bè và người thân',
        rating: 5,
        role: 'DONOR',
        created_at: '2024-02-15T12:00:00Z'
      },
      {
        id: 'comment_024',
        campaign_id: 'campaign_act2_1',
        user_id: 'donor_008',
        content: 'Mong sớm có nước sạch cho bà con sử dụng',
        rating: 5,
        role: 'DONOR',
        created_at: '2024-02-15T12:30:00Z'
      },
      {
        id: 'comment_025',
        campaign_id: 'campaign_act2_1',
        user_id: 'donor_009',
        content: 'Sẽ tiếp tục đóng góp cho chiến dịch',
        rating: 5,
        role: 'DONOR',
        created_at: '2024-02-15T13:00:00Z'
      },
      {
        id: 'comment_026',
        campaign_id: 'campaign_act2_1',
        user_id: 'donor_010',
        content: 'Hy vọng sớm khắc phục được tình trạng hạn hán',
        rating: 5,
        role: 'DONOR',
        created_at: '2024-02-15T13:30:00Z'
      },
      {
        id: 'comment_027',
        campaign_id: 'campaign_act2_1',
        user_id: 'ben_001',
        content: 'Cảm ơn quỹ đã quan tâm đến vùng hạn hán',
        rating: 5,
        role: 'BENEFICIARY',
        created_at: '2024-02-15T14:00:00Z'
      },
      {
        id: 'comment_028',
        campaign_id: 'campaign_act2_1',
        user_id: 'ben_002',
        content: 'Rất mong sớm có nước sạch sinh hoạt',
        rating: 5,
        role: 'BENEFICIARY',
        created_at: '2024-02-15T14:30:00Z'
      },
      {
        id: 'comment_029',
        campaign_id: 'campaign_act2_1',
        user_id: 'ben_003',
        content: 'Hệ thống lọc nước sẽ giúp ích rất nhiều cho bà con',
        rating: 5,
        role: 'BENEFICIARY',
        created_at: '2024-02-15T15:00:00Z'
      },
      {
        id: 'comment_030',
        campaign_id: 'campaign_act2_1',
        user_id: 'ben_004',
        content: 'Xin cảm ơn sự quan tâm của mọi người',
        rating: 5,
        role: 'BENEFICIARY',
        created_at: '2024-02-15T15:30:00Z'
      }
    ];

    await queryInterface.bulkInsert('Comments', comments, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', {
      id: [
        'comment_001', 'comment_002', 'comment_003', 'comment_004', 'comment_005',
        'comment_006', 'comment_007', 'comment_008', 'comment_009', 'comment_010',
        'comment_011', 'comment_012', 'comment_013', 'comment_014', 'comment_015',
        'comment_016', 'comment_017', 'comment_018', 'comment_019', 'comment_020',
        'comment_021', 'comment_022', 'comment_023', 'comment_024', 'comment_025',
        'comment_026', 'comment_027', 'comment_028', 'comment_029', 'comment_030'
      ]
    }, {});
  }
}; 