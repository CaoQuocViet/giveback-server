'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Comment extends Model {
    static associate(models) {
      // Quan hệ với Campaign (n-1)
      Comment.belongsTo(models.Campaign, {
        foreignKey: 'campaign_id',
        as: 'campaign'
      });

      // Quan hệ với User (n-1)
      Comment.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
    }
  }

  Comment.init({
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
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0,
        max: 5
      }
    },
    role: {
      type: '"Role"',
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'Comments',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  return Comment;
};