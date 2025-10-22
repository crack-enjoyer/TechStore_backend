const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  userServiceUrl: process.env.USER_SERVICE_URL,
  port: process.env.PORT || '3002',
  host: process.env.DB_HOST || 'localhost',
  db_port: process.env.DB_PORT || '5432',
  dialect: process.env.DB_DIALECT,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: console.log,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1h'
  },
  bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10)
};