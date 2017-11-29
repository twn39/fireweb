const DB = require('./DB');

const Comment = DB.Model.extend({
    tableName: 'comments',
});

module.exports = Comment;