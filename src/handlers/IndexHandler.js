const IndexHandler = {
    index(ctx, next) {
        ctx.logger.info('logger....');
        ctx.body = {
            title: 'Welcome to this site.',
            version: '1.0.1',
        };
    },
};

module.exports = IndexHandler;
