async function CheckToken(ctx, next) {
    console.log(ctx.headers);
    await next();
}

module.exports = CheckToken;
