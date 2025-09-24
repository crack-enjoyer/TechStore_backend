module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define('ProductImage', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    productId: { type: DataTypes.UUID, allowNull: false },
    url: { type: DataTypes.TEXT, allowNull: false },
    alt: { type: DataTypes.STRING(255) },
    position: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, {
    tableName: 'product_images',
    timestamps: true
  });

  ProductImage.associate = (models) => {
    ProductImage.belongsTo(models.Product, { foreignKey: 'productId' });
  };

  return ProductImage;
};
