'use strict';

const { Model, DataTypes } = require('sequelize');
const { CampaignStatus } = require('./types');

module.exports = (sequelize) => {
  class Campaign extends Model {
    static associate(models) {
      // Quan hệ với Charity (n-1)
      Campaign.belongsTo(models.Charity, {
        foreignKey: 'charity_id',
        as: 'charity'
      });

      // Quan hệ với Donation (1-n)
      Campaign.hasMany(models.Donation, {
        foreignKey: 'campaign_id',
        as: 'donations'
      });

      // Quan hệ với Distribution (1-n)
      Campaign.hasMany(models.Distribution, {
        foreignKey: 'campaign_id',
        as: 'distributions'
      });

      // Quan hệ với Comment (1-n)
      Campaign.hasMany(models.Comment, {
        foreignKey: 'campaign_id',
        as: 'comments'
      });
    }
  }

  Campaign.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    charityId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'charity_id',
      references: {
        model: 'Charities',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    detailGoal: {
      type: DataTypes.TEXT,
      field: 'detail_goal'
    },
    status: {
      type: '"CampaignStatus"',
      allowNull: false,
      defaultValue: 'STARTING'
    },
    rating: {
      type: DataTypes.DECIMAL,
      defaultValue: 0
    },
    targetAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'target_amount'
    },
    currentAmount: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
      field: 'current_amount'
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'start_date'
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'end_date'
    },
    province: DataTypes.STRING,
    district: DataTypes.STRING,
    ward: DataTypes.STRING,
    address: DataTypes.STRING,
    images: {
      type: DataTypes.STRING,
      allowNull: false
    },
    editHistory: {
      type: DataTypes.JSONB,
      field: 'edit_history'
    }
  }, {
    sequelize,
    modelName: 'Campaign',
    tableName: 'Campaigns',
    timestamps: true,
    underscored: true
  });

  return Campaign;
}; 