'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'full_name'
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      otpVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'otp_verified'
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: '"Role"',
        allowNull: false
      },
      profileImage: {
        type: Sequelize.STRING,
        field: 'profile_image'
      },
      province: {
        type: Sequelize.STRING
      },
      district: {
        type: Sequelize.STRING
      },
      ward: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      phoneVerifiedAt: {
        type: Sequelize.DATE,
        field: 'phone_verified_at'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'created_at'
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'updated_at'
      }
    });
  },

  async down(queryInterface, Sequelize) {
    // Xóa bảng
    await queryInterface.dropTable('Users');
  }
};
