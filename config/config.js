const dotenv = require('dotenv');
dotenv.config();

module.exports = {

    development: {
        dialect: 'postgres',
        "database": process.env.POSTGRES_DB,
        "username": process.env.POSTGRES_USER,
        "password": process.env.POSTGRES_PASSWORD,
        "host": process.env.POSTGRES_HOST || 'postgres', // Change localhost to postgres,

    },

    test: {
        "dialect": 'postgres',
        database: process.env.POSTGRES_DB,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST || 'postgres', // Change localhost to postgres,
    },

    production: {
        "dialect": 'postgres',
        database: process.env.POSTGRES_DB,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST || 'postgres', // Change localhost to postgres,
    },

};
