'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Tạo admin đầu tiên là system admin
    await queryInterface.bulkInsert('Admins', [
      {
        id: 'admin_001',
        is_system_admin: true
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Xóa admin đã tạo
    await queryInterface.bulkDelete('Admins', {
      id: ['admin_001']
    }, {});
  }
};
