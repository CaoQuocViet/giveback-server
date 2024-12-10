'use strict';

const { Sequelize } = require('sequelize');
const config = require('../../config/connectDB');
const userModel = require('./userModel');
const adminModel = require('./adminModel');
const paymentMethodModel = require('./paymentMethodModel');
const campaignModel = require('./campaignModel');
const charityModel = require('./charityModel');
const donationModel = require('./donationModel');
const distributionModel = require('./distributionModel');
const commentModel = require('./commentModel');
const otpCodeModel = require('./otpCodeModel');
const passwordResetModel = require('./passwordResetModel');

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
  PaymentMethod: paymentMethodModel(sequelize),
  Campaign: campaignModel(sequelize),
  Charity: charityModel(sequelize),
  Donation: donationModel(sequelize),
  Distribution: distributionModel(sequelize),
  Comment: commentModel(sequelize),
  OTPCode: otpCodeModel(sequelize),
  PasswordReset: passwordResetModel(sequelize)
};

// Thiết lập associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
