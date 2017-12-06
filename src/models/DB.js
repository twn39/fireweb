const config = {
    client: 'pg',
    connection: process.env.PG_CONNECTION,
    searchPath: ['knex', 'public'],
    pool: { min: 0, max: 80 },
};

const knex = require('knex')(config);

const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
