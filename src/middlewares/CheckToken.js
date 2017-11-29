const JWT = require('jsonwebtoken');

/**
 * @return {string}
 */
async function CheckToken(ctx, next) {
    let token = ctx.headers.authorization;

    if (typeof token === 'undefined') {
        return (ctx.body = 'token error');
    }

    token = token.substr(7);

    try {
        ctx.state.jwt = JWT.verify(token, process.env.JWT_SECRET);
        await next();
    } catch (error) {
        ctx.logger.error(error);
        return (ctx.body = 'token decode error');
    }
}

module.exports = CheckToken;
