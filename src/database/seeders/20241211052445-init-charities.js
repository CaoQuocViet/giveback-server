'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const charities = [
      {
        id: 'charity_act1',
        title: 'Quỹ Từ Thiện Ánh Dương',
        description: 'Hỗ trợ trẻ em nghèo vùng cao, cung cấp học bổng và xây dựng trường học',
        license_description: 'Giấy phép hoạt động từ thiện theo Nghị định 93/2019/NĐ-CP',
        license_image_url: 'licenses/charity_act1_license.jpg',
        license_number: '123/GP-TCHQ',
        license_date: '2020-01-15',
        license_issuer: 'Sở LĐTBXH TP.HCM',
        verification_status: 'VERIFIED',
        founding_date: '2019-12-01',
        website: 'www.anhduong.org.vn',
        social_links: JSON.stringify({
          facebook: 'facebook.com',
          youtube: 'youtube.com'
        }),
        created_at: '2024-01-20T00:00:00Z',
        updated_at: '2024-01-20T00:00:00Z'
      },
      {
        id: 'charity_act2',
        title: 'Quỹ Hy Vọng Xanh',
        description: 'Bảo vệ môi trường và phát triển bền vững cộng đồng',
        license_description: 'Giấy phép hoạt động từ thiện theo Nghị định 93/2019/NĐ-CP',
        license_image_url: 'licenses/charity_act2_license.jpg',
        license_number: '124/GP-TCHQ',
        license_date: '2020-03-20',
        license_issuer: 'Sở LĐTBXH TP.HCM',
        verification_status: 'VERIFIED',
        founding_date: '2020-01-15',
        website: 'www.hyvongxanh.org.vn',
        social_links: JSON.stringify({
          facebook: 'facebook.com',
          instagram: 'instagram.com'
        }),
        created_at: '2024-01-21T00:00:00Z',
        updated_at: '2024-01-21T00:00:00Z'
      },
      {
        id: 'charity_act3',
        title: 'Quỹ Nhân Ái',
        description: 'Hỗ trợ người già neo đơn và trẻ mồ côi',
        license_description: 'Giấy phép hoạt động từ thiện theo Nghị định 93/2019/NĐ-CP',
        license_image_url: 'licenses/charity_act3_license.jpg',
        license_number: '125/GP-TCHQ',
        license_date: '2020-05-10',
        license_issuer: 'Sở LĐTBXH TP.HCM',
        verification_status: 'VERIFIED',
        founding_date: '2020-03-01',
        website: 'www.nhanai.org.vn',
        social_links: JSON.stringify({
          facebook: 'facebook.com'
        }),
        created_at: '2024-01-22T00:00:00Z',
        updated_at: '2024-01-22T00:00:00Z'
      },
      {
        id: 'charity_act4',
        title: 'Quỹ Trái Tim Yêu Thương',
        description: 'Hỗ trợ phẫu thuật tim cho trẻ em nghèo',
        license_description: 'Giấy phép hoạt động từ thiện theo Nghị định 93/2019/NĐ-CP',
        license_image_url: 'licenses/charity_act4_license.jpg',
        license_number: '126/GP-TCHQ',
        license_date: '2020-07-15',
        license_issuer: 'Sở LĐTBXH TP.HCM',
        verification_status: 'VERIFIED',
        founding_date: '2020-05-01',
        website: 'www.traitimyeuthuong.org.vn',
        social_links: JSON.stringify({
          facebook: 'facebook.com'
        }),
        created_at: '2024-01-23T00:00:00Z',
        updated_at: '2024-01-23T00:00:00Z'
      },
      {
        id: 'charity_act5',
        title: 'Quỹ Mái Ấm Hạnh Phúc',
        description: 'Xây dựng nhà tình thương cho người nghèo',
        license_description: 'Giấy phép hoạt động từ thiện theo Nghị định 93/2019/NĐ-CP',
        license_image_url: 'licenses/charity_act5_license.jpg',
        license_number: '127/GP-TCHQ',
        license_date: '2020-09-20',
        license_issuer: 'Sở LĐTBXH TP.HCM',
        verification_status: 'VERIFIED',
        founding_date: '2020-07-01',
        website: 'www.maiamhanhphuc.org.vn',
        social_links: JSON.stringify({
          facebook: 'facebook.com'
        }),
        created_at: '2024-01-24T00:00:00Z',
        updated_at: '2024-01-24T00:00:00Z'
      },
      {
        id: 'charity_act6',
        title: 'Quỹ Ánh Sáng Cuộc Sống',
        description: 'Hỗ trợ người khuyết tật hòa nhập cộng đồng',
        license_description: 'Giấy phép hoạt động từ thiện theo Nghị định 93/2019/NĐ-CP',
        license_image_url: 'licenses/charity_act6_license.jpg',
        license_number: '128/GP-TCHQ',
        license_date: '2020-11-15',
        license_issuer: 'Sở LĐTBXH TP.HCM',
        verification_status: 'VERIFIED',
        founding_date: '2020-09-01',
        website: 'www.anhsangcuocsong.org.vn',
        social_links: JSON.stringify({
          facebook: 'facebook.com'
        }),
        created_at: '2024-01-22T00:00:00Z',
        updated_at: '2024-01-22T00:00:00Z'
      },
      {
        id: 'charity_pen1',
        title: 'Mái Ấm Tình Thương',
        description: 'Xây dựng mái ấm cho người vô gia cư',
        license_description: 'Giấy phép hoạt động từ thiện theo Nghị định 93/2019/NĐ-CP',
        license_image_url: 'licenses/charity_pen1_license.jpg',
        license_number: '129/GP-TCHQ',
        license_date: '2023-06-20',
        license_issuer: 'Sở LĐTBXH TP.HCM',
        verification_status: 'PENDING',
        founding_date: '2023-05-01',
        website: 'www.maiamtinhthuong.org.vn',
        social_links: JSON.stringify({
          facebook: 'facebook.com'
        }),
        created_at: '2024-01-23T00:00:00Z',
        updated_at: '2024-01-23T00:00:00Z'
      },
      {
        id: 'charity_pen2',
        title: 'Quỹ Giáo Dục Vì Tương Lai',
        description: 'Hỗ trợ giáo dục cho học sinh nghèo vượt khó',
        license_description: 'Giấy phép hoạt động từ thiện theo Nghị định 93/2019/NĐ-CP',
        license_image_url: 'licenses/charity_pen2_license.jpg',
        license_number: '130/GP-TCHQ',
        license_date: '2023-07-15',
        license_issuer: 'Sở LĐTBXH TP.HCM',
        verification_status: 'PENDING',
        founding_date: '2023-06-01',
        website: 'www.tuonglai.org.vn',
        social_links: JSON.stringify({
          facebook: 'facebook.com'
        }),
        created_at: '2024-01-24T00:00:00Z',
        updated_at: '2024-01-24T00:00:00Z'
      },
      {
        id: 'charity_rej1',
        title: 'Tổ Chức Tương Lai Xanh',
        description: 'Phát triển nông nghiệp sạch',
        license_description: 'Giấy phép hoạt động từ thiện theo Nghị định 93/2019/NĐ-CP',
        license_image_url: 'licenses/charity_rej1_license.jpg',
        license_number: '131/GP-TCHQ',
        license_date: '2023-10-01',
        license_issuer: 'Sở LĐTBXH TP.HCM',
        verification_status: 'REJECTED',
        founding_date: '2023-09-01',
        website: 'www.tuonglaixanh.org.vn',
        social_links: JSON.stringify({
          facebook: 'facebook.com'
        }),
        created_at: '2024-01-25T00:00:00Z',
        updated_at: '2024-01-25T00:00:00Z'
      },
      {
        id: 'charity_rej2',
        title: 'Quỹ Hỗ Trợ Giáo Dục',
        description: 'Hỗ trợ giáo dục vùng khó khăn',
        license_description: 'Giấy phép hoạt động từ thiện theo Nghị định 93/2019/NĐ-CP',
        license_image_url: 'licenses/charity_rej2_license.jpg',
        license_number: '132/GP-TCHQ',
        license_date: '2023-11-15',
        license_issuer: 'Sở LĐTBXH TP.HCM',
        verification_status: 'REJECTED',
        founding_date: '2023-10-01',
        website: 'www.hotrogiaoduc.org.vn',
        social_links: JSON.stringify({
          facebook: 'facebook.com'
        }),
        created_at: '2024-01-26T00:00:00Z',
        updated_at: '2024-01-26T00:00:00Z'
      }
    ];

    await queryInterface.bulkInsert('Charities', charities, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Charities', {
      id: [
        'charity_act1', 'charity_act2', 'charity_act3',
        'charity_act4', 'charity_act5', 'charity_act6',
        'charity_pen1', 'charity_pen2',
        'charity_rej1', 'charity_rej2'
      ]
    }, {});
  }
};