import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Admin, {
        foreignKey: 'id'
      });
      User.hasOne(models.Charity, {
        foreignKey: 'id'
      });
      User.hasMany(models.Donation, {
        foreignKey: 'donor_id'
      });
      User.hasMany(models.Comment, {
        foreignKey: 'user_id'
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