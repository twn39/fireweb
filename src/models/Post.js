const DB = require('./DB');

const Post = DB.Model.extend({
    tableName: 'posts',
});

module.exports = Post;
