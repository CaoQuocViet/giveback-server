'use strict';

import { Sequelize } from 'sequelize';
import config from '../../config/database.js';
import userModel from './userModel.js';
import adminModel from './adminModel.js';

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
  Admin: adminModel(sequelize)
};

// Thiết lập associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export { sequelize };
export default models;
