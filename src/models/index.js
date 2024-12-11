const { Sequelize } = require('sequelize');
const config = require('../config/connectDB');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false // Set true để debug SQL queries
  }
);

// Sử dụng các models đã có sẵn từ thư mục postgres
const models = {
  User: require('./postgres/userModel')(sequelize),
  Admin: require('./postgres/adminModel')(sequelize),
  Charity: require('./postgres/charityModel')(sequelize),
  Campaign: require('./postgres/campaignModel')(sequelize),
  PaymentMethod: require('./postgres/paymentMethodModel')(sequelize),
  Donation: require('./postgres/donationModel')(sequelize),
  Distribution: require('./postgres/distributionModel')(sequelize),
  Comment: require('./postgres/commentModel')(sequelize),
  OTPCode: require('./postgres/otpCodeModel')(sequelize),
  PasswordReset: require('./postgres/passwordResetModel')(sequelize)
};

// Định nghĩa relationships
Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = {
  sequelize,
  ...models
}; 