const Joi = require('joi');
const { SUCCESS, REQUEST_PARAMS_INVALID } = require('../helpers/ErrorCode');
const Code = require('../helpers/Code');
const PostRepo = require('../repositories/PostRepository');

const postAddSchema = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
});

const PostHandler = {
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

    async show(ctx, next) {

    },

    async update(ctx, next) {

    },

    async delete(ctx, next) {

    }
};

module.exports = PostHandler;
