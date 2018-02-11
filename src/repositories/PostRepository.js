const { Post, Comment, Tag, PostTag } = require('../models/Models');
const datefns = require('date-fns');
const BlueBird = require('bluebird');

class PostRepository {
    /**
     *
     * @param title
     * @param uid
     * @param content
     * @param tags
     * @returns {Promise<*>}
     */
    async add(title, uid, content, tags) {
        let post = new Post({
            title,
            user_id: uid,
            content,
            created_at: datefns.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
            updated_at: datefns.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
            deleted_at: null,
        });

        post = await post.save();

        if ((typeof tags !== 'undefined') && (tags.length > 0)) {
            await this.addTags(post.get('id'), tags);
        }

        return post;
    }

    async addTags(postId, tags) {
        tags.forEach(async (tagName) => {
            let tag = await Tag.where('name', tagName).fetch();
            if (tag === null) {
               tag = new Tag({
                   name: tagName,
                   weight: 0,
                   created_at: datefns.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
               });

               tag = await tag.save();
            }

            const postTag = new PostTag({
                post_id: postId,
                tag_id: tag.get('id'),
            });

            return await postTag.save();
        })
    }

    async find(id) {
        return await Post.query(qb => {
            qb.where('id', id).whereNull('deleted_at');
        }).fetch();
    }

    async delete(id) {
        const post = await this.find(id);

        if (post === null) {
            return true;
        }

        return await post.save(
            {
                deleted_at: datefns.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
            },
            { patch: true }
        );
    }

    /**
     *
     * @param page
     * @param perPage
     * @returns {Promise<void>}
     */
    async getAll(page, perPage) {
        let posts = await Post.query(qb => {
            qb.select('posts.*', 'users.username', 'users.avatar')
                .innerJoin('users', 'posts.user_id', '=', 'users.id')
                .whereNull('posts.deleted_at')
                .orderBy('posts.id', 'desc')
                .offset((page - 1) * perPage)
                .limit(perPage);
        }).fetchAll();

        posts = posts.toJSON();

        return BlueBird.map(posts, async (post) => {
            const lastCommentId = post.last_comment_id;

            if (lastCommentId !== 0) {
                const comment = await Comment.query(qb => {
                    qb.select('comments.*', 'users.username', 'users.avatar')
                        .innerJoin('users', 'comments.user_id', '=', 'users.id')
                        .where('comments.id', lastCommentId)
                        .whereNull('deleted_at')
                }).fetch();
                post.last_comment = comment.toJSON();
                return post;
            } else {
                post.last_comment = {};
                return post;
            }
        });

    }

    /**
     * 关键字下的所有文章
     * @param tagName
     * @param page
     * @param perPage
     * @returns {Promise<Array>}
     */
    async getAllByTag(tagName, page, perPage) {
        const tag = await Tag.where('name', tagName).fetch();
        if (tag === null) {
            return [];
        }

        const tagId = tag.get('id');

        let posts = await PostTag.query(qb => {
            qb.select('posts.*', 'users.avatar', 'users.username')
                .innerJoin('posts', 'post_tag.post_id', '=', 'posts.id')
                .innerJoin('users', 'posts.user_id', '=', 'users.id')
                .where('post_tag.tag_id', tagId)
                .whereNull('posts.deleted_at')
                .orderBy('posts.id', 'desc')
                .offset((page - 1) * perPage)
                .limit(perPage);
        }).fetchAll();

        posts = posts.toJSON();

        return BlueBird.map(posts, async (post) => {

            const lastCommentId = post.last_comment_id;

            if (lastCommentId !== 0) {
                const comment = await Comment.query(qb => {
                    qb.select('comments.*', 'users.username', 'users.avatar')
                        .innerJoin('users', 'comments.user_id', '=', 'users.id')
                        .where('comments.id', lastCommentId)
                        .whereNull('deleted_at')
                }).fetch();
                post.last_comment = comment.toJSON();
                return post;
            } else {
                post.last_comment = {};
                return post;
            }

        })

    }

    async totalCountByTag(tagName) {
        const tag = await Tag.where('name', tagName).fetch();
        if (tag === null) {
            return 0;
        }

        const tagId = tag.get('id');

        return await PostTag.query(qb => {
            qb.innerJoin('posts', 'post_tag.post_id', '=', 'posts.id')
                .where('post_tag.tag_id', tagId)
                .whereNull('posts.deleted_at')
        }).count();
    }

    async totalCount() {
        return await Post.query(qb => {
            qb.whereNull('deleted_at');
        }).count();
    }

    async viewsPlus(id) {
        const post = await this.find(id);
        return await post.save({
            views: post.get('views') + 1,
        })
    }

    /**
     * 获取指定用户的所有帖子
     * @param userId
     * @param page
     * @param perPage
     * @returns {Promise<*>}
     */
    async getUserPosts(userId, page, perPage) {
        return await Post.query(qb => {
            qb.where('user_id', userId)
                .select('id', 'title', 'views', 'comments', 'likes', 'created_at')
                .whereNull('deleted_at')
                .orderBy('id', 'desc')
                .offset((page - 1) * perPage)
                .limit(perPage)
        }).fetchAll();
    }

    /**
     * 数量
     * @param userId
     * @returns {Promise<*>}
     */
    async getUserPostsTotalCount(userId) {
        return await Post.query(qb => {
            qb.where('user_id', userId)
                .whereNull('deleted_at')
        }).count();
    }
}

const postRepo = new PostRepository();

module.exports = postRepo;
