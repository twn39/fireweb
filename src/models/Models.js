const DB = require('./DB');

const User = DB.Model.extend({
    tableName: 'users',
    posts() {
        return this.hasMany(Post);
    },
});

const Post = DB.Model.extend({
    tableName: 'posts',
    comments() {
        return this.hasMany(Comment);
    },
    author() {
        return this.belongsTo(User);
    },
});

const Comment = DB.Model.extend({
    tableName: 'comments',
    post() {
        return this.belongsTo(Post);
    },
});

const Tag = DB.Model.extend({
    tableName: 'tags',
});

module.exports = {
    User,
    Post,
    Comment,
    Tag,
};
