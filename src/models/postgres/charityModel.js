'use strict';

const { Model, DataTypes } = require('sequelize');
const { VerificationStatus } = require('./types');

module.exports = (sequelize) => {
  class Charity extends Model {
    static associate(models) {
      // Quan hệ với User (1-1)
      Charity.belongsTo(models.User, {
        foreignKey: 'id',
        as: 'user'
      });

      // Quan hệ với Campaign (1-n)
      Charity.hasMany(models.Campaign, {
        foreignKey: 'charity_id',
        as: 'campaigns'
      });
    }
  }

  Charity.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    licenseDescription: {
      type: DataTypes.TEXT,
      field: 'license_description'
    },
    licenseImageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'license_image_url'
    },
    licenseNumber: {
      type: DataTypes.STRING,
      field: 'license_number'
    },
    licenseDate: {
      type: DataTypes.DATE,
      field: 'license_date'
    },
    licenseIssuer: {
      type: DataTypes.STRING,
      field: 'license_issuer'
    },
    verificationStatus: {
      type: DataTypes.ENUM('PENDING', 'VERIFIED', 'REJECTED'),
      allowNull: false,
      defaultValue: 'PENDING',
      field: 'verification_status'
    },
    foundingDate: {
      type: DataTypes.DATE,
      field: 'founding_date'
    },
    website: DataTypes.STRING,
    socialLinks: {
      type: DataTypes.JSONB,
      field: 'social_links'
    },
    merchantId: {
      type: DataTypes.STRING,
      unique: true,
      field: 'merchant_id'
    },
    merchantName: {
      type: DataTypes.STRING,
      field: 'merchant_name'
    },
    bankAccount: {
      type: DataTypes.STRING,
      field: 'bank_account'
    },
    paymentGateway: {
      type: DataTypes.STRING,
      field: 'payment_gateway'
    },
    apiKey: {
      type: DataTypes.STRING,
      field: 'api_key'
    },
    rating: {
      type: DataTypes.DECIMAL,
      defaultValue: 0
    },
    campaignCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'campaign_count'
    },
    totalRaised: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
      field: 'total_raised'
    },
    bankName: {
      type: DataTypes.STRING,
      field: 'bank_name'
    },
    bankBranch: {
      type: DataTypes.STRING,
      field: 'bank_branch'
    },
    bankOwner: {
      type: DataTypes.STRING,
      field: 'bank_owner'
    }
  }, {
    sequelize,
    modelName: 'Charity',
    tableName: 'Charities',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true
  });

  return Charity;
}; 