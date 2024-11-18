const dotenv = require('dotenv');
dotenv.config();

console.log(process.env.POSTGRES_DB); // Debugging line
module.exports = {
    development: {
        dialect: 'postgres',
        database: process.env.POSTGRES_DB,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST || 'postgres', // Defaults to 'postgres' if POSTGRES_HOST is not set
        port: process.env.DB_PORT || 5432, // Ensure the port is correctly set, default to 5432
        logging: console.log, // Enable logging for debugging
    },

    test: {
        dialect: 'postgres',
        database: process.env.POSTGRES_DB,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST || 'postgres',
        port: process.env.DB_PORT || 5432,
        logging: false, // Disable logging for tests
    },

    production: {
        dialect: 'postgres',
        database: process.env.POSTGRES_DB,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST || 'postgres',
        port: process.env.DB_PORT || 5432,
        logging: false, // Disable logging for production
    },
};
