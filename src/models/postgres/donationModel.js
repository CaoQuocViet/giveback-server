'use strict';

const { Model, DataTypes } = require('sequelize');
const { PaymentStatus } = require('./types');

module.exports = (sequelize) => {
  class Donation extends Model {
    static associate(models) {
      // Quan hệ với Campaign (n-1)
      Donation.belongsTo(models.Campaign, {
        foreignKey: 'campaign_id',
        as: 'campaign'
      });

      // Quan hệ với User/Donor (n-1)
      Donation.belongsTo(models.User, {
        foreignKey: 'donor_id',
        as: 'donor'
      });

      // Quan hệ với PaymentMethod (n-1)
      Donation.belongsTo(models.PaymentMethod, {
        foreignKey: 'payment_method_id',
        as: 'paymentMethod'
      });
    }
  }

  Donation.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    campaignId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'campaign_id',
      references: {
        model: 'Campaigns',
        key: 'id'
      }
    },
    donorId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'donor_id',
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    paymentMethodId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'payment_method_id',
      references: {
        model: 'PaymentMethods',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    note: DataTypes.TEXT,
    invoiceCode: {
      type: DataTypes.STRING,
      unique: true,
      field: 'invoice_code'
    },
    paymentTransactionId: {
      type: DataTypes.STRING,
      unique: true,
      field: 'payment_transaction_id'
    },
    isAnonymous: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_anonymous'
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'SUCCESS', 'FAILED'),
      allowNull: false,
      defaultValue: 'PENDING'
    },
    isIntermediate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_intermediate'
    }
  }, {
    sequelize,
    modelName: 'Donation',
    tableName: 'Donations',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true
  });

  return Donation;
}; 