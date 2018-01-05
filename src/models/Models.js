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
    tags() {
        return this.belongsToMany(Tag, 'post_tag', 'post_id', 'tag_id');
    }
});

const Comment = DB.Model.extend({
    tableName: 'comments',
    post() {
        return this.belongsTo(Post);
    },
});

const Tag = DB.Model.extend({
    tableName: 'tags',
    posts() {
        return this.belongsToMany(Post, 'post_tag', 'tag_id', 'post_id');
    }
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

const PostTag = DB.Model.extend({
    tableName: 'post_tag',
    get idAttribute() {
        return null;
    },
});

const Letter = DB.Model.extend({
    tableName: 'letters',
});

module.exports = {
    User,
    Post,
    Comment,
    Tag,
    Like,
    BookMark,
    Follow,
    PostTag,
    Letter,
};
