const Donation = sequelize.define('Donation', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  // ... các trường hiện tại ...
  note: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  invoice_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  payment_transaction_id: {
    type: DataTypes.STRING,
    allowNull: true
  }
}); 