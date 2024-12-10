'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PaymentMethods', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      transactionCode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        field: 'transaction_code'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'updated_at',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
    
    // Tạo index cho transaction_code
    await queryInterface.addIndex('PaymentMethods', ['transaction_code'], {
      name: 'idx_payment_methods_transaction'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('PaymentMethods', 'idx_payment_methods_transaction');
    await queryInterface.dropTable('PaymentMethods');
  }
};