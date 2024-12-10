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
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT
    },
    detailGoal: {
      type: DataTypes.TEXT,
      field: 'detail_goal'
    },
    status: {
      type: DataTypes.ENUM(...Object.values(CampaignStatus)),
      allowNull: false,
      defaultValue: 'STARTING'
    },
    rating: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5
      }
    },
    targetAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'target_amount',
      validate: {
        min: 0
      }
    },
    currentAmount: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
      field: 'current_amount',
      validate: {
        min: 0
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'start_date'
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'end_date',
      validate: {
        isAfterStartDate(value) {
          if (value <= this.startDate) {
            throw new Error('End date must be after start date');
          }
        }
      }
    },
    province: {
      type: DataTypes.STRING
    },
    district: {
      type: DataTypes.STRING
    },
    ward: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    images: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    editHistory: {
      type: DataTypes.JSONB,
      field: 'edit_history'
    }
  }, {
    sequelize,
    modelName: 'Campaign',
    tableName: 'Campaigns',
    underscored: true,
    timestamps: true
  });

  return Campaign;
}; 