'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Campaigns', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      charityId: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'charity_id',
        references: {
          model: 'Charities',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      coverImage: {
        type: Sequelize.STRING,
        field: 'cover_image'
      },
      targetAmount: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        field: 'target_amount'
      },
      raisedAmount: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        field: 'raised_amount'
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'start_date'
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'end_date'
      },
      status: {
        type: Sequelize.ENUM('PENDING', 'ACTIVE', 'ENDED', 'CANCELLED'),
        allowNull: false,
        defaultValue: 'PENDING'
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
    await queryInterface.addIndex('Campaigns', ['charity_id'], {
      name: 'idx_campaigns_charity'
    });
    await queryInterface.addIndex('Campaigns', ['status'], {
      name: 'idx_campaigns_status'
    });
    await queryInterface.addIndex('Campaigns', ['province', 'district'], {
      name: 'idx_campaigns_location'
    });
  },

  async down(queryInterface, Sequelize) {
    // Xóa các indexes trước
    await queryInterface.removeIndex('Campaigns', 'idx_campaigns_charity');
    await queryInterface.removeIndex('Campaigns', 'idx_campaigns_status');
    await queryInterface.removeIndex('Campaigns', 'idx_campaigns_location');
    
    await queryInterface.dropTable('Campaigns');
  }
};