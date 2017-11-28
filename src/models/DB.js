const config = {
    client: 'mysql',
    connection: {
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME,
        charset  : process.env.DB_CHARSET,
    }
};
const knex = require('knex')(config);

const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
