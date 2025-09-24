module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    status: {
      type: DataTypes.ENUM('draft','pending','paid','shipped','completed','cancelled','refunded'),
      defaultValue: 'pending'
    },
    totalAmount: { type: DataTypes.DECIMAL(12,2), allowNull: false },
    placedAt: { type: DataTypes.DATE }
  }, {
    tableName: 'orders',
    timestamps: true
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: 'userId' });
    Order.hasMany(models.OrderItem, { foreignKey: 'orderId', onDelete: 'CASCADE' });
    Order.hasOne(models.Payment, { foreignKey: 'orderId' });
  };

  return Order;
};
