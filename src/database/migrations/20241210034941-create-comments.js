'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
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
        }
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
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      rating: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        validate: {
          min: 0,
          max: 5
        }
      },
      role: {
        type: '"Role"',
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Tạo các indexes
    await queryInterface.addIndex('Comments', ['campaign_id'], {
      name: 'idx_comments_campaign'
    });
    await queryInterface.addIndex('Comments', ['user_id'], {
      name: 'idx_comments_user'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments');
  }
};