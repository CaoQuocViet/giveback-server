'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      id: 'system_donor',
      full_name: 'Đóng góp trực tiếp qua tổ chức',
      email: 'system.donor@giveback.local',
      phone: '0000000000',
      password: 'SYSTEM_ACCOUNT_NOT_FOR_LOGIN',
      role: 'DONOR',
      otp_verified: true,
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { id: 'system_donor' });
  }
}; 