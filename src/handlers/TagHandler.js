const {
    SUCCESS,
} = require('../helpers/ErrorCode');
const Code = require('../helpers/Code');
const TagRepo = require('../repositories/TagRepository');

const TagHandler = {

    async all(ctx, next) {
        const tags = await TagRepo.all();

        ctx.body = Code(SUCCESS, tags)
    }
};

module.exports = TagHandler;