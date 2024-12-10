'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class OTPCode extends Model {
    static associate(models) {
      // Quan hệ với User (n-1) thông qua phone
      OTPCode.belongsTo(models.User, {
        foreignKey: 'phone',
        targetKey: 'phone',
        as: 'user'
      });
    }
  }

  OTPCode.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'phone'
      }
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'expires_at'
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    attemptCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'attempt_count'
    },
  }, {
    sequelize,
    modelName: 'OTPCode',
    tableName: 'OTPCodes',
    underscored: true,
    timestamps: true,
    updatedAt: false // OTP không cần updatedAt
  });

  return OTPCode;
}; 