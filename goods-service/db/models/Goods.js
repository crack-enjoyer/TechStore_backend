const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Goods = sequelize.define('Goods', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    tableName: 'goods',
    timeStamps: true,
    underscored: true
  });

  return Goods;
}