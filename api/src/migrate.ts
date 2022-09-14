const Knex = require('knex');

const migrate = async () => {
    require('dotenv').config();

    const databaseName = process.env.DB

    const connection = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }

    let knex = Knex({
        client: 'mysql',
        connection
    })

    await knex.raw('CREATE DATABASE IF NOT EXISTS ??', databaseName)

    knex = Knex({
        client: 'mysql',
        connection: {
            ...connection,
            database: databaseName,
        }
    })

    await knex.migrate.latest({directory: './src/db/migrations'});
}

migrate()
    .then(() => console.log('Migrated successfully!'))
    .catch(e => console.log(e))
    .finally(() => process.exit());
