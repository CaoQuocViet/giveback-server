module.exports = (sequelize, DataTypes) => {
  const Campaign = sequelize.define('Campaign', {
    // ... các trường khác
  });

  Campaign.associate = function(models) {
    Campaign.belongsTo(models.Charity, {
      foreignKey: 'charity_id',
      as: 'charity'  // Alias này phải khớp với as trong query
    });
  };

  return Campaign;
}; 