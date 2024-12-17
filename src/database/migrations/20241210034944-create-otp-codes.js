'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OTPCodes', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'expires_at'
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      attemptCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        field: 'attempt_count'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Tạo các indexes
    await queryInterface.addIndex('OTPCodes', ['phone'], {
      name: 'idx_otpcodes_phone'
    });
    await queryInterface.addIndex('OTPCodes', ['expires_at'], {
      name: 'idx_otpcodes_expires'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('OTPCodes', 'idx_otpcodes_phone');
    await queryInterface.removeIndex('OTPCodes', 'idx_otpcodes_expires');
    await queryInterface.dropTable('OTPCodes');
  }
};