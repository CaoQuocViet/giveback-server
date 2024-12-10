'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PasswordResets', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'expires_at'
      },
      used: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Tạo index cho user_id và token
    await queryInterface.addIndex('PasswordResets', ['user_id'], {
      name: 'idx_password_resets_user'
    });
    await queryInterface.addIndex('PasswordResets', ['token'], {
      name: 'idx_password_resets_token'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('PasswordResets', 'idx_password_resets_user');
    await queryInterface.removeIndex('PasswordResets', 'idx_password_resets_token');
    await queryInterface.dropTable('PasswordResets');
  }
};