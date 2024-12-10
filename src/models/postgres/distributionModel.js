'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Distribution extends Model {
    static associate(models) {
      // Quan hệ với Campaign (n-1)
      Distribution.belongsTo(models.Campaign, {
        foreignKey: 'campaign_id',
        as: 'campaign'
      });

      // Quan hệ với User/Beneficiary (n-1)
      Distribution.belongsTo(models.User, {
        foreignKey: 'beneficiary_id',
        as: 'beneficiary'
      });
    }
  }

  Distribution.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    campaignId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'campaign_id',
      references: {
        model: 'Campaigns',
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
    budget: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    distributionDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'distribution_date'
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
    beneficiaryCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'beneficiary_count',
      validate: {
        min: 1
      }
    },
    description: {
      type: DataTypes.TEXT
    },
    proofImages: {
      type: DataTypes.STRING,
      field: 'proof_images',
      validate: {
        isUrl: true
      }
    },
    representativeName: {
      type: DataTypes.STRING,
      field: 'representative_name',
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    reliefDate: {
      type: DataTypes.DATE,
      field: 'relief_date'
    }
  }, {
    sequelize,
    modelName: 'Distribution',
    tableName: 'Distributions',
    underscored: true,
    timestamps: true
  });

  return Distribution;
}; 