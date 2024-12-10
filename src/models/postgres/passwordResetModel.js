'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class PasswordReset extends Model {
    static associate(models) {
      // Quan hệ với User (n-1)
      PasswordReset.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
    }
  }

  PasswordReset.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'expires_at'
    },
    used: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'PasswordReset',
    tableName: 'PasswordResets',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  return PasswordReset;
}; 