const JWT = require('jsonwebtoken');
const { TOKEN_INVALID } = require('../helpers/ErrorCode');
const Code = require('../helpers/Code');

async function ParseToken(ctx, next) {
    let token = ctx.headers.authorization;

    if (typeof token === 'undefined') {
        return await next();
    }

    token = token.substr(7);

    try {
        ctx.state.jwt = JWT.verify(token, process.env.JWT_SECRET);
        await next();
    } catch (error) {
        ctx.logger.error(error);
        return (ctx.body = Code(TOKEN_INVALID));
    }
}

module.exports = ParseToken;
