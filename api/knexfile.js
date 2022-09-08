// Update with your config settings.
require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST,
      port : 3306,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB
    },
    migrations: {
      directory: './src/db/migrations'
    },
    seeds: {
      directory: './src/db/seeds/dev'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST,
      port : 3306,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB
    },
    migrations: {
      directory: './src/db/migrations'
    },
    seeds: {
      directory: './src/db/seeds/staging'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST,
      port : 3306,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB
    },
    migrations: {
      directory: './src/db/migrations'
    },
    seeds: {
      directory: './src/db/seeds/prod'
    },
    useNullAsDefault: true
  }
};
