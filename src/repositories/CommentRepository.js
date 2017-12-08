const { Comment, Post } = require('../models/Models');
const datefns = require('date-fns');

class CommentRepository {
    async find(id) {
        return await Comment.query(qb => {
            qb.where('id', id).whereNull('deleted_at');
        }).fetch();
    }
    async add(userId, postId, content) {
        let comment = new Comment({
            user_id: userId,
            post_id: postId,
            content,
            created_at: datefns.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
            deleted_at: null,
        });

        comment = await comment.save();
        const post = await Post.where('id', postId).fetch();
        await post.save({'last_comment_id': comment.get('id')}, {patch: true});

        return true;
    }

    async findByUser(userId, commentId) {
        return await Comment.query(qb => {
            qb
                .where('id', commentId)
                .where('user_id', userId)
                .whereNull('deleted_at');
        }).fetch();
    }

    async findAllByPost(postId, page, perPage) {
        return await Comment.query(qb => {
            qb.select('comments.id', 'comments.content', 'comments.user_id',
                'users.username', 'users.avatar', 'comments.created_at')
                .innerJoin('users', 'comments.user_id', '=', 'users.id')
                .where('post_id', postId)
                .whereNull('deleted_at')
                .offset((page - 1) * perPage)
                .limit(perPage);
        }).fetchAll();
    }

    async totalCountByPost(postId) {
        return await Comment.query(qb => {
            qb.where('post_id', postId)
                .whereNull('deleted_at');
        }).count();
    }

    async delete(id) {
        const comment = await this.find(id);

        return await comment.save(
            {
                deleted_at: datefns.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
            },
            { patch: true }
        );
    }
}

const commentRepo = new CommentRepository();

module.exports = commentRepo;
