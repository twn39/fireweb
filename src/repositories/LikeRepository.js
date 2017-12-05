const { Like, Post } = require('../models/Models');
const DB = require('../models/DB');
const datefns = require('date-fns');

class LikeRepository {

    async like(userId, postId) {

        const post = await Post.where('id', postId).fetch();
        if (post === null) {
            return false;
        }

        try {
            return await DB.transaction(async (t) => {

                const like = new Like({
                    'post_id': postId,
                    'user_id': userId,
                    'created_at': datefns.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
                });

                like.save(null, {transacting: t});

                await post.save({
                    likes: post.get('likes') + 1,
                }, {patch: true, transacting: t});

                return true;
            });

        } catch (error) {
            console.log(error);
            return false;
        }
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