const JWT = require('jsonwebtoken');
const { TOKEN_INVALID } = require('../helpers/ErrorCode');
const Code = require('../helpers/Code');

/**
 * @return {string}
 */
async function CheckToken(ctx, next) {
    let token = ctx.headers.authorization;

    if (typeof token === 'undefined') {
        return ctx.body = Code(TOKEN_INVALID);
    }

    token = token.substr(7);

    try {
        ctx.state.jwt = JWT.verify(token, process.env.JWT_SECRET);
        console.log(ctx.state.jwt);
        await next();
    } catch (error) {
        ctx.logger.error(error);
        return ctx.body = Code(TOKEN_INVALID);
    }
}

module.exports = CheckToken;
