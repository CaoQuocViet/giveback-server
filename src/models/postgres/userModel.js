import { Model, DataTypes } from 'sequelize';
const { Role } = require('./types');

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Charity, {
        foreignKey: 'id',
        as: 'charity'
      });
      User.hasMany(models.Donation, {
        foreignKey: 'donor_id',
        as: 'donations'
      });
      User.hasMany(models.Comment, {
        foreignKey: 'user_id',
        as: 'comments'
      });
      User.hasMany(models.OTPCode, {
        foreignKey: 'phone',
        sourceKey: 'phone',
        as: 'otpCodes'
      });
      User.hasMany(models.PasswordReset, {
        foreignKey: 'user_id',
        as: 'passwordResets'
      });
    }
  }

  User.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'full_name'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    otpVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'otp_verified'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('ADMIN', 'DONOR', 'CHARITY', 'BENEFICIARY'),
      allowNull: false
    },
    profileImage: {
      type: DataTypes.STRING,
      field: 'profile_image'
    },
    province: DataTypes.STRING,
    district: DataTypes.STRING,
    ward: DataTypes.STRING,
    address: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'updated_at'
    },
    phoneVerifiedAt: {
      type: DataTypes.DATE,
      field: 'phone_verified_at'
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true,
    underscored: true
  });

  return User;
}; 