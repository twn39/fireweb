const Joi = require('joi');
const CommentRepo = require('../repositories/CommentRepository');
const PostRepo = require('../repositories/PostRepository');
const {
    SUCCESS,
    REQUEST_PARAMS_INVALID,
    HAVE_NO_RIGHT,
} = require('../helpers/ErrorCode');
const Code = require('../helpers/Code');
const isEmpty = require('lodash.isempty');

const addCommentSchema = Joi.object().keys({
    content: Joi.string().required(),
});

class CommentHandler {
    /**
     * router: GET /v1/posts/{id}/comments
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async index(ctx, next) {
        const postId = ctx.params.id;

        const {page, perPage} = isEmpty(ctx.query) ? {page: 1, perPage: 20} : ctx.query;

        let comments = await CommentRepo.findAllByPost(postId, page, perPage);

        if (comments === null) {
           comments = [];
        }
        const totalCount = await CommentRepo.totalCountByPost(postId);

        return ctx.body = Code(SUCCESS, {
            page: page,
            per_page: perPage,
            comments: comments,
            total_count: totalCount,
        })
    }

    /**
     * router: POST /v1/posts/:id/comments
     * @param ctx
     * @param next
     * @returns {Promise<*>}
     */
    async add(ctx, next) {
        const params = ctx.request.body;

        const result = Joi.validate(params, addCommentSchema);
        if (result.error !== null) {
            return (ctx.body = Code(REQUEST_PARAMS_INVALID, '', result.error));
        }

        const uid = ctx.state.jwt.uid;
        const postId = ctx.params.id;
        const comment = await CommentRepo.add(uid, postId, params.content);
        await PostRepo.commentPlus(postId);

        if (comment) {
            return (ctx.body = Code(SUCCESS));
        }
    }

    /**
     * router: DELETE /v1/posts/:id/comments/:id
     * @param ctx
     * @param next
     * @returns {Promise<*>}
     */
    async delete(ctx, next) {
        const userId = ctx.state.jwt.uid;
        const commentId = ctx.params.cid;

        // check permission
        const comment = CommentRepo.findByUser(userId, commentId);
        if (comment === null) {
            return (ctx.body = Code(HAVE_NO_RIGHT));
        }

        await CommentRepo.delete(commentId);

        return (ctx.body = Code(SUCCESS));
    }
}

module.exports = new CommentHandler();
