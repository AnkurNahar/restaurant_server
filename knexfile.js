require('dotenv').config();

module.exports = {
  development: {
    client: 'mysql',
    debug: true,
    connection: {
      host: process.env.DB_HOST_DEV,
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      password: process.env.DB_PASS_DEV
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
