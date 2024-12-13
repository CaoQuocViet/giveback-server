'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Admin extends Model {
    static associate(models) {
      Admin.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
    }
  }

  Admin.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    isSystemAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_system_admin'
    }
  }, {
    sequelize,
    modelName: 'Admin',
    tableName: 'Admins',
    timestamps: true,
    underscored: true
  });

  return Admin;
}; 