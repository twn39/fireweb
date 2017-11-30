const { Post } = require('../models/Models');
const datefns = require('date-fns');

class PostRepository {

    async add(title, uid, content) {

        let post = new Post({
            title,
            'user_id': uid,
            content,
            'created_at': datefns.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
            'updated_at': datefns.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
            'deleted_at': datefns.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
        });

        post = await post.save();

        return post;
    }
}

const postRepo = new PostRepository();

module.exports = postRepo;
