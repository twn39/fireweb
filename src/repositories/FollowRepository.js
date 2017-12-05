const { Follow } = require('../models/Models');
const DB = require('../models/DB');
const datefns = require('date-fns');
const UserRepo = require('./UserRepository');

class FollowRepository {

    async find(userId, followId) {
        return await Follow.where('user_id', userId)
            .where('follow_id', followId)
            .fetch();
    }

    async follow(userId, followId) {
        const followUser = await UserRepo.find(followId);

        if (followUser === null) {
            return false;
        }

        try {
            return await DB.transaction(async (t) => {

                const follow = new Follow({
                    'user_id': userId,
                    'follow_id': followUser,
                    'created_at': datefns.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
                });

                await follow.save(null, {transacting: t});

                await followUser.save({
                    fans: followUser.get('fans') + 1,
                }, {patch: true, transacting: t});

                return true;
            });
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async unFollow(userId, followId) {

        const followUser = await UserRepo.find(followId);

        if (followUser === null) {
            return false;
        }
        try {
            return DB.transaction(async (t) => {
                const follow = await this.find(userId, followId);

                if (follow === null) {
                    throw new Error('database follows table record is not exist.');
                }
                await Follow.where('user_id', userId)
                    .where('follow_id', followId)
                    .destroy({transacting: t});

                await followUser.save({
                    fans: followUser.get('fans') - 1,
                }, {patch: true, transacting: t});

                return true;
            })
        } catch (error) {
            console.log(error);
            return false;
        }

    }
}

const followRepo = new FollowRepository();

module.exports = followRepo;
