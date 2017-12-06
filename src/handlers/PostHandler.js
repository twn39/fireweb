const Joi = require('joi');
const {
    SUCCESS,
    REQUEST_PARAMS_INVALID,
    RESOURCE_NOT_EXIST,
} = require('../helpers/ErrorCode');
const Code = require('../helpers/Code');
const PostRepo = require('../repositories/PostRepository');

const postAddSchema = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    tags: Joi.array().unique(),
});

const PostHandler = {
    /**
     * router: POST /v1/posts
     *
     * @param ctx
     * @param next
     * @returns {Promise<*>}
     */
    async add(ctx, next) {
        const params = ctx.request.body;

        const result = Joi.validate(params, postAddSchema);
        if (result.error !== null) {
            return (ctx.body = Code(REQUEST_PARAMS_INVALID, '', result.error));
        }
        const uid = ctx.state.jwt.uid;
        const post = await PostRepo.add(params.title, uid, params.content);

        if (post) {
            ctx.body = Code(SUCCESS);
        }
    },

    /**
     * router: GET /v1/posts/:id
     * @param ctx
     * @param next
     * @returns {Promise<*>}
     */
    async show(ctx, next) {
        const postId = ctx.params.id;
        const post = await PostRepo.find(postId);

        if (post === null) {
            return (ctx.body = Code(RESOURCE_NOT_EXIST));
        }

        return (ctx.body = Code(SUCCESS, post.toJSON()));
    },

    async update(ctx, next) {},

    /**
     * router: DELETE /v1/posts/:id
     * @param ctx
     * @param next
     * @returns {Promise<*>}
     */
    async delete(ctx, next) {
        const postId = ctx.params.id;

        const success = PostRepo.delete(postId);
        return (ctx.body = Code(SUCCESS, success));
    },

    /**
     * router: GET /v1/posts?page=1&perPage=20
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async index(ctx, next) {},
};

module.exports = PostHandler;
