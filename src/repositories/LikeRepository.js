const { Like } = require('../models/Models');
const datefns = require('date-fns');

class LikeRepository {

    async like(userId, postId) {

        const like = new Like({
            'post_id': postId,
            'user_id': userId,
            'created_at': datefns.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
        });

        return await like.save();
    }

    async unLike(userId, postId) {
        await Like.where('post_id', postId)
            .where('user_id', userId)
            .destroy();

        return true;
    }
}

const likeRepo = new LikeRepository();
module.exports = likeRepo;