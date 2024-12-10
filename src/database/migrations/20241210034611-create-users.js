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
        type: Sequelize.ENUM('ADMIN', 'DONOR', 'CHARITY', 'BENEFICIARY'),
        allowNull: false
      },
      profileImage: {
        type: Sequelize.STRING,
        field: 'profile_image'
      },
      province: Sequelize.STRING,
      district: Sequelize.STRING,
      ward: Sequelize.STRING,
      address: Sequelize.STRING,
      phoneVerifiedAt: {
        type: Sequelize.DATE,
        field: 'phone_verified_at'
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

    // Tạo các indexes
    await queryInterface.addIndex('Users', ['email'], {
      name: 'idx_users_email'
    });
    await queryInterface.addIndex('Users', ['phone'], {
      name: 'idx_users_phone'
    });
    await queryInterface.addIndex('Users', ['role'], {
      name: 'idx_users_role'
    });
    await queryInterface.addIndex('Users', ['province', 'district'], {
      name: 'idx_users_location'
    });
  },

  async down(queryInterface, Sequelize) {
    // Xóa các indexes trước
    await queryInterface.removeIndex('Users', 'idx_users_email');
    await queryInterface.removeIndex('Users', 'idx_users_phone');
    await queryInterface.removeIndex('Users', 'idx_users_role');
    await queryInterface.removeIndex('Users', 'idx_users_location');
    
    // Xóa bảng
    await queryInterface.dropTable('Users');
  }
};
