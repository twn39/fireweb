
const UserRepo = require('../repositories/UserRepository');
const Joi = require('joi');
const JWT = require('jsonwebtoken');

const signUpSchema = Joi.object().keys({
    username: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
});

const AuthHandler = {
    async signup(ctx, next) {

        const postData = ctx.request.body;
        const result = Joi.validate(postData, signUpSchema);
        if (result.error !== null) {
            return ctx.body = result.error;
        }

        const user = await UserRepo.add(postData.username, postData.email, postData.password);
        if (!user) {
            return ctx.body = 'signup failed';
        }

        const exp = Math.floor(Date.now() / 1000) + (60 * 60 * 24);

        const token = JWT.sign({
            iss: process.env.JWT_ISS,
            sub: process.env.JWT_SUB,
            aud: process.env.JWT_AUD,
            exp: exp,
            uid: user.id,
        }, process.env.JWT_SECRET);

        ctx.body = {
            token: token,
            exp: exp,
        };
    }
};

module.exports = AuthHandler;