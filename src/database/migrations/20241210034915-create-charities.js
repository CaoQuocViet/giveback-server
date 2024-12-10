'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Charities', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        references: {
          model: 'Users',
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
      licenseDescription: {
        type: Sequelize.TEXT,
        field: 'license_description'
      },
      licenseImageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'license_image_url'
      },
      licenseNumber: {
        type: Sequelize.STRING,
        field: 'license_number'
      },
      licenseDate: {
        type: Sequelize.DATE,
        field: 'license_date'
      },
      licenseIssuer: {
        type: Sequelize.STRING,
        field: 'license_issuer'
      },
      verificationStatus: {
        type: '"VerificationStatus"',
        allowNull: false,
        defaultValue: 'PENDING',
        field: 'verification_status'
      },
      foundingDate: {
        type: Sequelize.DATE,
        field: 'founding_date'
      },
      website: {
        type: Sequelize.STRING
      },
      socialLinks: {
        type: Sequelize.JSONB,
        field: 'social_links'
      },
      merchantId: {
        type: Sequelize.STRING,
        unique: true,
        field: 'merchant_id'
      },
      merchantName: {
        type: Sequelize.STRING,
        field: 'merchant_name'
      },
      bankAccount: {
        type: Sequelize.STRING,
        field: 'bank_account'
      },
      paymentGateway: {
        type: Sequelize.STRING,
        field: 'payment_gateway'
      },
      apiKey: {
        type: Sequelize.STRING,
        field: 'api_key'
      },
      rating: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      campaignCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        field: 'campaign_count'
      },
      totalRaised: {
        type: Sequelize.DECIMAL,
        defaultValue: 0,
        field: 'total_raised'
      },
      bankName: {
        type: Sequelize.STRING,
        field: 'bank_name'
      },
      bankBranch: {
        type: Sequelize.STRING,
        field: 'bank_branch'
      },
      bankOwner: {
        type: Sequelize.STRING,
        field: 'bank_owner'
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

    await queryInterface.addIndex('Charities', ['merchant_id'], {
      name: 'idx_charities_merchant'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Charities');
  }
};