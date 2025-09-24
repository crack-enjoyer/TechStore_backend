module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING(255), allowNull: false },
    slug: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL(12,2), allowNull: false },
    sku: { type: DataTypes.STRING(100), unique: true },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    isPublished: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    tableName: 'products',
    timestamps: true,
    paranoid: true // soft delete
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Category, { foreignKey: 'categoryId' });
    Product.hasMany(models.ProductImage, { foreignKey: 'productId', onDelete: 'CASCADE' });
    Product.hasMany(models.Review, { foreignKey: 'productId', onDelete: 'CASCADE' });
    Product.hasMany(models.OrderItem, { foreignKey: 'productId' });
    Product.hasMany(models.CartItem, { foreignKey: 'productId' });
  };

  return Product;
};
