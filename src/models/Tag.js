const DB = require('./DB');

const Tag = DB.Model.extend({
    tableName: 'tags',
});

module.exports = Tag;