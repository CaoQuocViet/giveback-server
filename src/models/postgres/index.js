'use strict';

const { Sequelize } = require('sequelize');
const config = require('../../config/connectDB');
const userModel = require('./userModel');
const adminModel = require('./adminModel');
const paymentMethodModel = require('./paymentMethodModel');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: false,
    define: {
      timestamps: true,
      underscored: true
    }
  }
);

const models = {
  User: userModel(sequelize),
  Admin: adminModel(sequelize),
  PaymentMethod: paymentMethodModel(sequelize)
};

// Thiết lập associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = models;
module.exports.sequelize = sequelize;
