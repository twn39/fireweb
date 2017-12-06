const { SUCCESS, SERVER_ERROR } = require('../helpers/ErrorCode');
const Code = require('../helpers/Code');
const FollowRepo = require('../repositories/FollowRepository');

const FollowHandler = {
    /**
     * router: GET /v1/users/{id}/follow
     * @param ctx
     * @param next
     * @returns {Promise<*>}
     */
    async follow(ctx, next) {
        const uid = ctx.state.jwt.uid;
        const followUserId = ctx.params.id;

        const success = await FollowRepo.follow(uid, followUserId);

        if (success) {
            return (ctx.body = Code(SUCCESS));
        }

        return (ctx.body = Code(SERVER_ERROR));
    },

    /**
     * router: GET /v1/users/{id}/unfollow
     * @param ctx
     * @param next
     * @returns {Promise<*>}
     */
    async unFollow(ctx, next) {
        const uid = ctx.state.jwt.uid;
        const followUserId = ctx.params.id;

        const success = await FollowRepo.unFollow(uid, followUserId);

        if (success) {
            return (ctx.body = Code(SUCCESS));
        }

        return (ctx.body = Code(SERVER_ERROR));
    },
};

module.exports = FollowHandler;
