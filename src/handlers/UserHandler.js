const UserRepo = require('../repositories/UserRepository');
const { SUCCESS, REQUEST_PARAMS_INVALID } = require('../helpers/ErrorCode');
const Joi = require('joi');

const updateUserSchema = Joi.object().keys({
    username: Joi.string(),
    avatar: Joi.string(),
    age: Joi.number(),
    gender: Joi.number(),
    phone: Joi.string(),
    address: Joi.string(),
    sign: Joi.string(),
});

const UserHandler = {
    async update(ctx, next) {
        const params = ctx.request.body;

        const result = Joi.validate(params, updateUserSchema);
        if (result.error !== null) {
            return ctx.body = Code(REQUEST_PARAMS_INVALID, '', result.error);
        }

        const uid = ctx.state.jwt.uid;
        const user = await UserRepo.update(uid, params);

        if (user) {
            return ctx.body = Code(SUCCESS);
        }
    }
};

module.exports = UserHandler;