const UserRepo = require('../repositories/UserRepository');
const Joi = require('joi');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { SUCCESS, REQUEST_PARAMS_INVALID, USERNAME_OR_EMAIL_INVALID } = require('../helpers/ErrorCode');
const Code = require('../helpers/Code');

const signUpSchema = Joi.object().keys({
    username: Joi.string()
        .min(2)
        .max(20)
        .required(),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .min(6)
        .max(30)
        .required(),
});

const loginSchema = Joi.object().keys({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .min(6)
        .max(30)
        .required(),
});

const AuthHandler = {
    /**
     * router: POST /v1/signup
     *
     * @param ctx
     * @param next
     * @returns {Promise.<*>}
     */
    async signup(ctx, next) {
        const postData = ctx.request.body;
        const result = Joi.validate(postData, signUpSchema);
        if (result.error !== null) {
            return (ctx.body = Code(REQUEST_PARAMS_INVALID, '', result.error));
        }

        const user = await UserRepo.add(
            postData.username,
            postData.email,
            postData.password
        );
        if (!user) {
            return (ctx.body = 'signup failed');
        }

        const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

        const token = JWT.sign(
            {
                iss: process.env.JWT_ISS,
                sub: process.env.JWT_SUB,
                aud: process.env.JWT_AUD,
                exp: exp,
                uid: user.id,
            },
            process.env.JWT_SECRET
        );

        return (ctx.body = Code(SUCCESS, { token, exp }));
    },

    /**
     * router: POST /v1/login
     * @param ctx
     * @param next
     * @returns
     */
    async login(ctx, next) {
        const params = ctx.request.body;
        const result = Joi.validate(params, loginSchema);

        if (result.error !== null) {
            return (ctx.body = 'login failed');
        }

        const user = await UserRepo.findByEmail(params.email);

        if (user === null) {
            return ctx.body = Code(USERNAME_OR_EMAIL_INVALID);
        }

        const match = await bcrypt.compare(
            params.password,
            user.toJSON().password
        );

        if (!match) {
            return ctx.body  = Code(USERNAME_OR_EMAIL_INVALID);
        }

        const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

        const token = JWT.sign(
            {
                iss: process.env.JWT_ISS,
                sub: process.env.JWT_SUB,
                aud: process.env.JWT_AUD,
                exp: exp,
                uid: user.id,
            },
            process.env.JWT_SECRET
        );

        return (ctx.body = Code(SUCCESS, { token, exp, user: {
            id: user.get('id'),
            username: user.get('username'),
            avatar: user.get('avatar'),
        } }));
    },
    /**
     * route: /v1/token/refresh
     *
     * @param ctx
     * @param next
     * @returns {Promise<{token: *, exp: number}>}
     */
    async tokenRefresh(ctx, next) {
        const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
        const uid = ctx.state.jwt.uid;

        const token = JWT.sign(
            {
                iss: process.env.JWT_ISS,
                sub: process.env.JWT_SUB,
                aud: process.env.JWT_AUD,
                exp: exp,
                uid: uid,
            },
            process.env.JWT_SECRET
        );

        return (ctx.body = Code(SUCCESS, { token, exp }));
    },
};

module.exports = AuthHandler;
