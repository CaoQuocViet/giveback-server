'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const campaigns = [
      {
        id: 'campaign_act1_1',
        charity_id: 'charity_act1',
        title: 'Cứu trợ lũ lụt miền Trung',
        description: 'Hỗ trợ khẩn cấp cho 200 hộ dân bị ảnh hưởng bởi lũ lụt tại Quảng Nam',
        detail_goal: 'Mục tiêu: Cung cấp nhu yếu phẩm và hỗ trợ tái thiết nhà cửa\nĐối tượng: 200 hộ dân bị thiệt hại nặng do lũ\nThực hiện: Phối hợp với UBND xã và Hội Chữ thập đỏ\nPhân bổ: Nhu yếu phẩm (50%), Sửa chữa nhà (45%), Quản lý (5%)',
        status: 'ONGOING',
        target_amount: 500000000,
        start_date: '2024-02-01T00:00:00Z',
        end_date: '2024-03-01T00:00:00Z',
        province: 'Quảng Nam',
        district: 'Huyện Phú Ninh',
        ward: 'Xã Tam Thanh',
        address: 'Thôn 3, Xã Tam Thanh',
        images: 'campaigns/campaign1.png',
        created_at: '2024-02-01T00:00:00Z',
        updated_at: '2024-02-01T00:00:00Z'
      },
      {
        id: 'campaign_act1_2',
        charity_id: 'charity_act1',
        title: 'Hỗ trợ khẩn cấp miền Trung',
        description: 'Cung cấp thực phẩm và nước sạch cho 150 hộ dân bị ảnh hưởng bởi thiên tai.',
        detail_goal: 'Mục tiêu: Cung cấp thực phẩm và nước sạch cho 150 hộ dân\nĐối tượng: 150 hộ dân bị ảnh hưởng\nThực hiện: Phối hợp với các tổ chức địa phương\nPhân bổ: Thực phẩm (60%), Nước sạch (30%), Quản lý (10%)',
        status: 'STARTING',
        target_amount: 300000000,
        start_date: '2024-03-10T00:00:00Z',
        end_date: '2024-05-10T00:00:00Z',
        province: 'Quảng Nam',
        district: 'Huyện Đại Lộc',
        ward: 'Xã Đại Hòa',
        address: 'Thôn 1, Xã Đại Hòa',
        images: 'campaigns/campaign2.png',
        created_at: '2024-03-10T00:00:00Z',
        updated_at: '2024-03-10T00:00:00Z'
      },
      {
        id: 'campaign_act1_3',
        charity_id: 'charity_act1',
        title: 'Tái thiết nhà cửa cho người dân',
        description: 'Hỗ trợ xây dựng lại nhà cho 100 hộ dân bị thiệt hại nặng nề.',
        detail_goal: 'Mục tiêu: Xây dựng lại nhà cho 100 hộ dân\nĐối tượng: 100 hộ dân bị thiệt hại nặng\nThực hiện: Phối hợp với các nhà thầu xây dựng\nPhân bổ: Xây dựng (80%), Quản lý (20%)',
        status: 'COMPLETED',
        target_amount: 1000000000,
        start_date: '2023-12-01T00:00:00Z',
        end_date: '2024-01-01T00:00:00Z',
        province: 'Quảng Nam',
        district: 'Huyện Duy Xuyên',
        ward: 'Xã Duy Nghĩa',
        address: 'Thôn 2, Xã Duy Nghĩa',
        images: 'campaigns/campaign3.png',
        created_at: '2023-12-01T00:00:00Z',
        updated_at: '2023-12-01T00:00:00Z'
      },
      {
        id: 'campaign_act1_4',
        charity_id: 'charity_act1',
        title: 'Hỗ trợ người dân sau bão',
        description: 'Cung cấp nhu yếu phẩm cho 200 hộ dân sau bão.',
        detail_goal: 'Mục tiêu: Cung cấp nhu yếu phẩm cho 200 hộ dân\nĐối tượng: 200 hộ dân bị ảnh hưởng\nThực hiện: Phối hợp với các tổ chức từ thiện\nPhân bổ: Nhu yếu phẩm (70%), Quản lý (30%)',
        status: 'CLOSED',
        target_amount: 400000000,
        start_date: '2023-11-01T00:00:00Z',
        end_date: '2023-12-01T00:00:00Z',
        province: 'Quảng Nam',
        district: 'Huyện Thăng Bình',
        ward: 'Xã Bình Dương',
        address: 'Thôn 3, Xã Bình Dương',
        images: 'campaigns/campaign4.png',
        created_at: '2023-11-01T00:00:00Z',
        updated_at: '2023-11-01T00:00:00Z'
      },
      {
        id: 'campaign_act2_1',
        charity_id: 'charity_act2',
        title: 'Khắc phục hạn hán miền Tây',
        description: 'Cung cấp nước sạch và hỗ trợ nông dân bị thiệt hại do hạn hán',
        detail_goal: 'Mục tiêu: Lắp đặt hệ thống lọc nước và hỗ trợ giống cây trồng\nĐối tượng: 150 hộ nông dân\nThực hiện: Hợp tác với Sở NN&PTNT\nPhân bổ: Hệ thống nước (60%), Giống cây (35%), Quản lý (5%)',
        status: 'ONGOING',
        target_amount: 300000000,
        start_date: '2024-02-15T00:00:00Z',
        end_date: '2024-04-15T00:00:00Z',
        province: 'Bạc Liêu',
        district: 'Huyện Vĩnh Lợi',
        ward: 'Xã Vĩnh Hưng',
        address: 'Ấp Vĩnh Phú, Xã Vĩnh Hưng',
        images: 'campaigns/campaign5.png',
        created_at: '2024-02-15T00:00:00Z',
        updated_at: '2024-02-15T00:00:00Z'
      },
      {
        id: 'campaign_act3_1',
        charity_id: 'charity_act3',
        title: 'Cứu trợ sạt lở miền núi',
        description: 'Hỗ trợ khẩn cấp và tái định cư cho người dân vùng sạt lở',
        detail_goal: 'Mục tiêu: Di dời và xây dựng nhà tạm cho 50 hộ dân\nĐối tượng: Các hộ dân vùng nguy hiểm\nThực hiện: Phối hợp với chính quyền địa phương\nPhân bổ: Xây dựng (70%), Nhu yếu phẩm (25%), Quản lý (5%)',
        status: 'STARTING',
        target_amount: 400000000,
        start_date: '2024-03-01T00:00:00Z',
        end_date: '2024-05-31T00:00:00Z',
        province: 'Quảng Nam',
        district: 'Huyện Nam Trà My',
        ward: 'Xã Trà Leng',
        address: 'Thôn 1, Xã Trà Leng',
        images: 'campaigns/campaign6.png',
        created_at: '2024-03-01T00:00:00Z',
        updated_at: '2024-03-01T00:00:00Z'
      },
      {
        id: 'campaign_act4_1',
        charity_id: 'charity_act4',
        title: 'Cứu trợ động đất Lai Châu',
        description: 'Hỗ trợ khẩn cấp cho 100 hộ dân bị ảnh hưởng bởi động đất',
        detail_goal: 'Mục tiêu: Cung cấp lều trại và nhu yếu phẩm khẩn cấp\nĐối tượng: 100 hộ dân mất nhà cửa do động đất\nThực hiện: Phối hợp với UBND huyện và quân đội\nPhân bổ: Lều trại (40%), Nhu yếu phẩm (55%), Quản lý (5%)',
        status: 'STARTING',
        target_amount: 300000000,
        start_date: '2024-03-15T00:00:00Z',
        end_date: '2024-05-15T00:00:00Z',
        province: 'Lai Châu',
        district: 'Huyện Nậm Nhùn',
        ward: 'Xã Nậm Ban',
        address: 'Bản Nậm Ngà, Xã Nậm Ban',
        images: 'campaigns/campaign7.png',
        created_at: '2024-03-15T00:00:00Z',
        updated_at: '2024-03-15T00:00:00Z'
      },
      {
        id: 'campaign_act5_1',
        charity_id: 'charity_act5',
        title: 'Khắc phục bão lụt Quảng Bình',
        description: 'Hỗ trợ sửa chữa nhà cửa và cung cấp nhu yếu phẩm cho người dân vùng bão',
        detail_goal: 'Mục tiêu: Sửa chữa 50 ngôi nhà và cung cấp nhu yếu phẩm\nĐối tượng: Các hộ nghèo bị thiệt hại nặng do bão\nThực hiện: Phối hợp với chính quyền địa phương\nPhân bổ: Sửa chữa nhà (70%), Nhu yếu phẩm (25%), Quản lý (5%)',
        status: 'STARTING',
        target_amount: 450000000,
        start_date: '2024-04-01T00:00:00Z',
        end_date: '2024-06-30T00:00:00Z',
        province: 'Quảng Bình',
        district: 'Huyện Quảng Trạch',
        ward: 'Xã Quảng Phú',
        address: 'Thôn Phú Lộc, Xã Quảng Phú',
        images: 'campaigns/campaign8.png',
        created_at: '2024-04-01T00:00:00Z',
        updated_at: '2024-04-01T00:00:00Z'
      },
      {
        id: 'campaign_act6_1',
        charity_id: 'charity_act6',
        title: 'Giúp đỡ nạn nhân bão lũ miền Trung',
        description: 'Hỗ trợ khẩn cấp nhu yếu phẩm cho 500 hộ dân.',
        detail_goal: 'Mục tiêu: Cung cấp nhu yếu phẩm cho 500 hộ dân\nĐối tượng: Người dân chịu ảnh hưởng của bão\nThực hiện: Phối hợp với Hội Chữ thập đỏ\nPhân bổ: Nhu yếu phẩm (90%), Quản lý (10%)',
        status: 'ONGOING',
        target_amount: 600000000,
        start_date: '2024-04-15T00:00:00Z',
        end_date: '2024-07-15T00:00:00Z',
        province: 'Quảng Trị',
        district: 'Huyện Cam Lộ',
        ward: 'Xã Cam An',
        address: 'Thôn 4, Xã Cam An',
        images: 'campaigns/campaign9.png',
        created_at: '2024-04-15T00:00:00Z',
        updated_at: '2024-04-15T00:00:00Z'
      }
    ];

    await queryInterface.bulkInsert('Campaigns', campaigns, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Campaigns', {
      id: [
        'campaign_act1_1', 'campaign_act2_1', 'campaign_act3_1',
        'campaign_act4_1', 'campaign_act5_1', 'campaign_act6_1'
      ]
    }, {});
  }
};
