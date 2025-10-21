const { Sequelize } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.db_port,
    dialect: config.dialect,
    logging: config.logging || false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      underscored: false,
      freezeTableName: true, 
    }
  }
);

const User = require('./models/User')(sequelize);

module.exports = {
  sequelize,
  Sequelize,
  User,
};