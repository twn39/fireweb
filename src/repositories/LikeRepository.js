const { Like } = require('../models/Models');
const DB = require('../models/DB');
const datefns = require('date-fns');
const PostRepo = require('./PostRepository');

class LikeRepository {

    async find(userId, postId) {
        return await Like.where('user_id', userId)
            .where('post_id', postId)
            .fetch();
    }
    /**
     *
     * @param userId
     * @param postId
     * @returns {Promise<*>}
     */
    async like(userId, postId) {

        const post = await PostRepo.find(postId);
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

                await like.save(null, {transacting: t});

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

    /**
     *
     * @param userId
     * @param postId
     * @returns {Promise<boolean>}
     */
    async unLike(userId, postId) {
        const post = await PostRepo.find(postId);
        if (post === null) {
            return false;
        }
        try {
            return DB.transaction(async (t) => {
                const like = await this.find(userId, postId);

                if (like === null) {
                    throw new Error('database likes table record is not exist.');
                }
                await Like.where('user_id', userId)
                    .where('post_id', postId)
                    .destroy({transacting: t});

                await post.save({
                    likes: post.get('likes') - 1,
                }, {patch: true, transacting: t});

                return true;
            })
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

const likeRepo = new LikeRepository();
module.exports = likeRepo;