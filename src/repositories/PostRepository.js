const { Post } = require('../models/Models');
const datefns = require('date-fns');

class PostRepository {
    async add(title, uid, content) {
        let post = new Post({
            title,
            user_id: uid,
            content,
            created_at: datefns.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
            updated_at: datefns.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
            deleted_at: null,
        });

        post = await post.save();

        return post;
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
}

const postRepo = new PostRepository();

module.exports = postRepo;
