// scripts/sync-db.js
require('dotenv').config();
const db = require('../db/index');

async function main() {
  try {
    // Опция { alter: true } удобна на dev для автоматического приведения схемы,
    // но для production используйте миграции.
    await db.sequelize.authenticate();
    console.log('DB connected');

    await db.sequelize.sync({ alter: true });
    console.log('DB synced');

    // сид: роли
    const roles = ['admin','customer','manager'];
    for (const r of roles) {
      await db.Role.findOrCreate({ where: { name: r }, defaults: { description: `${r} role` } });
    }

    console.log('Seeded roles.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();