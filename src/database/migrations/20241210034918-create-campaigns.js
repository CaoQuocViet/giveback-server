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
        }
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      detailGoal: {
        type: Sequelize.TEXT,
        field: 'detail_goal'
      },
      status: {
        type: '"CampaignStatus"',
        allowNull: false,
        defaultValue: 'STARTING'
      },
      rating: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      targetAmount: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        field: 'target_amount'
      },
      currentAmount: {
        type: Sequelize.DECIMAL,
        defaultValue: 0,
        field: 'current_amount'
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
      images: {
        type: Sequelize.STRING,
        allowNull: false
      },
      editHistory: {
        type: Sequelize.JSONB,
        field: 'edit_history'
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

    // Tạo các indexes
    await queryInterface.addIndex('Campaigns', ['charity_id'], {
      name: 'idx_campaigns_charity'
    });
  },

  async down(queryInterface, Sequelize) {
    // Xóa các indexes trước
    await queryInterface.removeIndex('Campaigns', 'idx_campaigns_charity');
    
    await queryInterface.dropTable('Campaigns');
  }
};