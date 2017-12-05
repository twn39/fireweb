const {
    SUCCESS,
    REQUEST_PARAMS_INVALID,
    RESOURCE_NOT_EXIST,
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

        if (success) {
            return ctx.body = Code(SUCCESS);
        }

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
