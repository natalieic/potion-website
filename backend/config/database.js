import { Sequelize } from 'sequelize';

// cria conexão com banco em memória
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_PATH, // './db/potions.sqlite'
  logging: false,
});

export default sequelize;