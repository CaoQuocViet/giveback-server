module.exports = (sequelize, DataTypes) => {
  const Charity = sequelize.define('Charity', {
    // ... các trường khác
  });

  Charity.associate = function(models) {
    Charity.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'  // Alias này phải khớp với as trong query
    });
    
    Charity.hasMany(models.Campaign, {
      foreignKey: 'charity_id',
      as: 'campaigns'
    });
  };

  return Charity;
}; 