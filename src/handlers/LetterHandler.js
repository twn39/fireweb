
class LetterHandler {

    async add(ctx, next) {

        const receiveUid = ctx.params.id;
        const senderUid = ctx.state.jwt.id;

        ctx.body = 'letter';
    }
}

module.exports = new LetterHandler();