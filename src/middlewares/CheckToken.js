const JWT = require('jsonwebtoken');

async function CheckToken(ctx, next) {
    
    let token = ctx.headers.authorization;

    if (typeof token === 'undefined') {
        return ctx.body = 'token error';
    }

    token = token.substr(7);

    try {
        const jwtData = JWT.verify(token, process.env.JWT_SECRET);
        ctx.state.jwt = jwtData;
        await next();
        
    } catch (error) {
        ctx.logger.error(error);
        return ctx.body = 'token decode error';
    }
}

module.exports = CheckToken;
