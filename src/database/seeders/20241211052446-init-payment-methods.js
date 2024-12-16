'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Thêm dữ liệu cho bảng PaymentMethods
    await queryInterface.bulkInsert('PaymentMethods', [
      {
        id: 'payment_method_1',
        name: 'ZALOPAY',
        transaction_code: 'ZALOPAY_001',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'payment_method_2',
        name: 'VNPAY',
        transaction_code: 'VNPAY_001',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'payment_method_3',
        name: 'MOMO',
        transaction_code: 'MOMO_001',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'payment_method_4',
        name: 'BANK TRANSFER',
        transaction_code: 'BANK_TRANSFER_001',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'payment_method_5',
        name: 'QUA TCTT',
        transaction_code: 'DONATE_THOUGHT_CHARITY_001',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // Xóa dữ liệu trong bảng PaymentMethods
    await queryInterface.bulkDelete('PaymentMethods', null, {});
  }
};
