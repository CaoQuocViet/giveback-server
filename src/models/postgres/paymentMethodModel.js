'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class PaymentMethod extends Model {
    static associate(models) {
      // define association here
      PaymentMethod.hasMany(models.Donation, {
        foreignKey: 'payment_method_id',
        as: 'donations'
      });
    }
  }

  PaymentMethod.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    transactionCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'transaction_code'
    }
  }, {
    sequelize,
    modelName: 'PaymentMethod',
    tableName: 'PaymentMethods',
    timestamps: false
  });

  return PaymentMethod;
}; 