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

const Like = DB.Model.extend({
    tableName: 'likes',
    get idAttribute() {
        return null;
    },
});

const BookMark = DB.Model.extend({
    tableName: 'bookmarks',
    get idAttribute() {
        return null;
    },
});

const Follow = DB.Model.extend({
    tableName: 'follows',
    get idAttribute() {
        return null;
    },
});

module.exports = {
    User,
    Post,
    Comment,
    Tag,
    Like,
    BookMark,
    Follow,
};
