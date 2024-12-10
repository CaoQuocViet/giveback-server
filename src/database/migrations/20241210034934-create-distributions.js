'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Distributions', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      campaignId: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'campaign_id',
        references: {
          model: 'Campaigns',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      beneficiaryId: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'beneficiary_id',
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      note: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.ENUM('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED'),
        allowNull: false,
        defaultValue: 'PENDING'
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
    await queryInterface.addIndex('Distributions', ['campaign_id'], {
      name: 'idx_distributions_campaign'
    });
    await queryInterface.addIndex('Distributions', ['beneficiary_id'], {
      name: 'idx_distributions_beneficiary'
    });
    await queryInterface.addIndex('Distributions', ['status'], {
      name: 'idx_distributions_status'
    });
  },

  async down(queryInterface, Sequelize) {
    // Xóa các indexes trước
    await queryInterface.removeIndex('Distributions', 'idx_distributions_campaign');
    await queryInterface.removeIndex('Distributions', 'idx_distributions_beneficiary');
    await queryInterface.removeIndex('Distributions', 'idx_distributions_status');
    
    await queryInterface.dropTable('Distributions');
  }
};