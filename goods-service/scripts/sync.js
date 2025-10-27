const { sequelize } = require('../db/init');

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

    return true;
  } catch (error) {
    console.error('Ошибка инициализации базы данных:', error);
    throw error;
  }
}

module.exports = { main };