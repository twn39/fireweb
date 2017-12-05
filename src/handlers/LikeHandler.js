const {
    SUCCESS,
    RESOURCE_NOT_EXIST,
    SERVER_ERROR
} = require('../helpers/ErrorCode');
const Code = require('../helpers/Code');
const LikeRepo = require('../repositories/LikeRepository');

const LikeHandler = {
    /**
     * router: GET /v1/posts/{id}/like
     * @param ctx
     * @param next
     * @returns {Promise<*>}
     */
    async like(ctx, next) {
        const uid = ctx.state.jwt.uid;
        const postId = ctx.params.id;

        const success = await LikeRepo.like(uid, postId);

        console.log(success);

        if (success) {
            return ctx.body = Code(SUCCESS);
        }

        return ctx.body = Code(SERVER_ERROR);
    },

    /**
     * router: /v1/posts/{id}/unlike
     * @param ctx
     * @param next
     * @returns {Promise<*>}
     */
    async unLike(ctx, next) {
        const uid = ctx.state.jwt.uid;
        const postId = ctx.params.id;

        const success = await LikeRepo.unLike(uid, postId);

        if (success) {
            return ctx.body = Code(SUCCESS);
        }
    },
};

module.exports = LikeHandler;
