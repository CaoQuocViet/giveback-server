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
        images: 'flood_relief.jpg',
        created_at: '2024-02-01T00:00:00Z',
        updated_at: '2024-02-01T00:00:00Z'
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
        images: 'drought_relief.jpg',
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
        images: 'landslide_relief.jpg',
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
        images: 'earthquake_relief.jpg',
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
        images: 'storm_relief.jpg',
        created_at: '2024-04-01T00:00:00Z',
        updated_at: '2024-04-01T00:00:00Z'
      },
      {
        id: 'campaign_act6_1',
        charity_id: 'charity_act6',
        title: 'Cứu trợ cháy rừng Tây Nguyên',
        description: 'Hỗ trợ khẩn cấp cho người dân vùng bị ảnh hưởng bởi cháy rừng',
        detail_goal: 'Mục tiêu: Hỗ trợ di dời và ổn định cuộc sống\nĐối tượng: 80 hộ dân vùng cháy rừng\nThực hiện: Phối hợp với kiểm lâm và chính quyền\nPhân bổ: Di dời (40%), Nhu yếu phẩm (55%), Quản lý (5%)',
        status: 'STARTING',
        target_amount: 350000000,
        start_date: '2024-04-15T00:00:00Z',
        end_date: '2024-06-15T00:00:00Z',
        province: 'Đắk Lắk',
        district: 'Huyện Ea Kar',
        ward: 'Xã Ea Kar',
        address: 'Buôn Ea Kar, Xã Ea Kar',
        images: 'forest_fire_relief.jpg',
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
