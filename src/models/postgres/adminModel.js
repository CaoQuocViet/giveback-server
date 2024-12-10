'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Admin extends Model {
    static associate(models) {
      // Quan hệ với User (1-1)
      Admin.belongsTo(models.User, {
        foreignKey: 'id',
        as: 'user'
      });
    }
  }

  Admin.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    isSystemAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_system_admin'
    }
  }, {
    sequelize,
    modelName: 'Admin',
    tableName: 'Admins',
    underscored: true,
    timestamps: false
  });

  return Admin;
}; 