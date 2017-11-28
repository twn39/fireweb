
const UserRepo = require('../repositories/UserRepository');
const Joi = require('joi');

const signUpSchema = Joi.object().keys({
    username: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
});

const AuthHandler = {
    async signup(ctx, next) {

        const result = Joi.validate(ctx.request.body, signUpSchema);
        if (result.error !== null) {
            return ctx.body = result.error;
        }

        ctx.body = await UserRepo.find(1);
    }
};

module.exports = AuthHandler;
