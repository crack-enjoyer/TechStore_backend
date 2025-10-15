require('dotenv').config();
const db = require('../db/init');

async function main(options = {}) {
  try {
    await sequelize.authenticate();
    console.log('Подключение к базе данных установлено успешно');

    if (options.sync !== false) {
      await sequelize.sync({ 
        force: options.force || false,
        alter: options.alter || false  
      });
      console.log('Модели синхронизированы с базой данных');
    }

    if (options.seedRoles !== false) {
      await db.seedBasicRoles();
    }

    return true;
  } catch (error) {
    console.error('Ошибка инициализации базы данных:', error);
    throw error;
  }
}

main();