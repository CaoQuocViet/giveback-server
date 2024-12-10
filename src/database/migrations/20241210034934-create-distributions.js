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
        }
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      budget: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      distributionDate: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'distribution_date'
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
      beneficiaryCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'beneficiary_count'
      },
      description: {
        type: Sequelize.TEXT
      },
      proofImages: {
        type: Sequelize.STRING,
        field: 'proof_images'
      },
      representativeName: {
        type: Sequelize.STRING,
        field: 'representative_name',
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      reliefDate: {
        type: Sequelize.DATE,
        field: 'relief_date'
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
    await queryInterface.addIndex('Distributions', ['campaign_id'], {
      name: 'idx_distributions_campaign'
    });
    await queryInterface.addIndex('Distributions', ['distribution_date'], {
      name: 'idx_distributions_date'
    });
    await queryInterface.addIndex('Distributions', ['province', 'district'], {
      name: 'idx_distributions_location'
    });
    await queryInterface.addIndex('Distributions', ['budget'], {
      name: 'idx_distributions_budget'
    });
  },

  async down(queryInterface, Sequelize) {
    // Xóa các indexes trước
    await queryInterface.removeIndex('Distributions', 'idx_distributions_campaign');
    await queryInterface.removeIndex('Distributions', 'idx_distributions_date');
    await queryInterface.removeIndex('Distributions', 'idx_distributions_location');
    await queryInterface.removeIndex('Distributions', 'idx_distributions_budget');
    
    await queryInterface.dropTable('Distributions');
  }
};