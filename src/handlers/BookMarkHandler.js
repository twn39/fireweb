const { SUCCESS, SERVER_ERROR } = require('../helpers/ErrorCode');
const Code = require('../helpers/Code');
const BookMarkRepo = require('../repositories/BookMarkRepository');

const BookMarkHandler = {
    /**
     * router: GET /v1/posts/{id}/bookmark
     * @param ctx
     * @param next
     * @returns {Promise<*>}
     */
    async bookmark(ctx, next) {
        const uid = ctx.state.jwt.uid;
        const postId = ctx.params.id;

        const success = await BookMarkRepo.bookmark(uid, postId);

        if (success) {
            return (ctx.body = Code(SUCCESS));
        }

        return (ctx.body = Code(SERVER_ERROR));
    },

    /**
     * router: GET /v1/posts/{id}/unbookmark
     * @param ctx
     * @param next
     * @returns {Promise<*>}
     */
    async unBookMark(ctx, next) {
        const uid = ctx.state.jwt.uid;
        const postId = ctx.params.id;

        const success = await BookMarkRepo.unBookMark(uid, postId);

        if (success) {
            return (ctx.body = Code(SUCCESS));
        }

        return (ctx.body = Code(SERVER_ERROR));
    },
};

module.exports = BookMarkHandler;
