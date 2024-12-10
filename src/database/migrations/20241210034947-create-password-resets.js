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
        }
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

    // Tạo các indexes
    await queryInterface.addIndex('PasswordResets', ['token'], {
      name: 'idx_passwordresets_token'
    });
    await queryInterface.addIndex('PasswordResets', ['expires_at'], {
      name: 'idx_passwordresets_expires'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('PasswordResets', 'idx_passwordresets_token');
    await queryInterface.removeIndex('PasswordResets', 'idx_passwordresets_expires');
    await queryInterface.dropTable('PasswordResets');
  }
};