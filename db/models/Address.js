module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    type: { type: DataTypes.ENUM('billing','shipping'), defaultValue: 'shipping' },
    line1: { type: DataTypes.STRING, allowNull: false },
    line2: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING, allowNull: false },
    region: { type: DataTypes.STRING },
    postalCode: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING, allowNull: false },
    isDefault: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    tableName: 'addresses',
    timestamps: true
  });

  Address.associate = (models) => {
    Address.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Address;
};
