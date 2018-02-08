const UserRepo = require('../repositories/UserRepository');
const PostRepo = require('../repositories/PostRepository');
const {
    SUCCESS,
    REQUEST_PARAMS_INVALID,
    HAVE_NO_RIGHT,
} = require('../helpers/ErrorCode');
const Code = require('../helpers/Code');
const Joi = require('joi');
const { isEmpty } = require('lodash');

const updateUserSchema = Joi.object().keys({
    username: Joi.string(),
    avatar: Joi.string(),
    age: Joi.number(),
    email: Joi.string().email(),
    password: Joi.string()
        .min(6)
        .max(30),
    gender: Joi.number(),
    phone: Joi.string(),
    address: Joi.string(),
    sign: Joi.string(),
});

const UserHandler = {
    /**
     * router: POST /v1/users/{id}
     * @param ctx
     * @param next
     * @returns {Promise<*>}
     */
    async update(ctx, next) {
        const params = ctx.request.body;

        const result = Joi.validate(params, updateUserSchema);
        if (result.error !== null) {
            return (ctx.body = Code(REQUEST_PARAMS_INVALID, '', result.error));
        }

        const uid = ctx.state.jwt.uid;
        if (uid !== parseInt(ctx.params.id)) {
            return (ctx.body = Code(HAVE_NO_RIGHT));
        }

        if (!isEmpty(params)) {
            const user = await UserRepo.update(uid, params);
        }

        return (ctx.body = Code(SUCCESS));
    },

    async search(ctx, next) {

    },

    async avatar(ctx, next) {

    },
    /**
     * router: GET /v1/users/{id}/posts
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async userPosts(ctx, next) {
        const userId = ctx.params.id;
        let {page, perPage} = ctx.query;
        page = typeof page === 'undefined' ? 1 : parseInt(page);
        perPage = typeof perPage === 'undefined' ? 20 : parseInt(perPage);
        const posts = await PostRepo.getUserPosts(userId, page, perPage);
        const totalCount = await PostRepo.getUserPostsTotalCount(userId);

        return ctx.body = Code(SUCCESS, {
            page: page,
            perPage: perPage,
            posts: posts,
            total_count: totalCount,
        })
    },

    async banner(ctx, next) {
        const userId = ctx.params.id;

        const user = await UserRepo.find(userId);

        return ctx.body = Code(SUCCESS, {
            banner: user.get('banner')
        })
    },

    async postBanner(ctx, next) {
        const userId = ctx.params.id;

        await UserRepo.update(userId, {
            banner: ctx.request.body.banner,
        });

        return ctx.body = Code(SUCCESS)
    }
};

module.exports = UserHandler;
