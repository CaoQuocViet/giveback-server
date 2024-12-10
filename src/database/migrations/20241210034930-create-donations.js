'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Donations', {
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
      donorId: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'donor_id',
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      paymentMethodId: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'payment_method_id',
        references: {
          model: 'PaymentMethods',
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
      invoiceCode: {
        type: Sequelize.STRING,
        unique: true,
        field: 'invoice_code'
      },
      paymentTransactionId: {
        type: Sequelize.STRING,
        unique: true,
        field: 'payment_transaction_id'
      },
      isAnonymous: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_anonymous'
      },
      status: {
        type: Sequelize.ENUM('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED'),
        allowNull: false,
        defaultValue: 'PENDING'
      },
      isIntermediate: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        field: 'is_intermediate'
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
    await queryInterface.addIndex('Donations', ['campaign_id'], {
      name: 'idx_donations_campaign'
    });
    await queryInterface.addIndex('Donations', ['donor_id'], {
      name: 'idx_donations_donor'
    });
    await queryInterface.addIndex('Donations', ['payment_method_id'], {
      name: 'idx_donations_payment_method'
    });
    await queryInterface.addIndex('Donations', ['status'], {
      name: 'idx_donations_status'
    });
  },

  async down(queryInterface, Sequelize) {
    // Xóa các indexes trước
    await queryInterface.removeIndex('Donations', 'idx_donations_campaign');
    await queryInterface.removeIndex('Donations', 'idx_donations_donor');
    await queryInterface.removeIndex('Donations', 'idx_donations_payment_method');
    await queryInterface.removeIndex('Donations', 'idx_donations_status');
    
    await queryInterface.dropTable('Donations');
  }
};