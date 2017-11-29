const UserRepo = require('../repositories/UserRepository');
const Joi = require('joi');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
            return (ctx.body = result.error);
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

        ctx.body = {
            token: token,
            exp: exp,
        };
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
            return (ctx.body = 'email or password is invalid');
        }

        const match = await bcrypt.compare(
            params.password,
            user.toJSON().password
        );

        if (!match) {
            return (ctx.body = 'email or password is invalid');
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

        return (ctx.body = {
            token: token,
            exp: exp,
        });
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

        return (ctx.body = {
            token: token,
            exp: exp,
        });
    },
};

module.exports = AuthHandler;
