const {
    SUCCESS,
} = require('../helpers/ErrorCode');
const Code = require('../helpers/Code');
const TagRepo = require('../repositories/TagRepository');

const TagHandler = {

    async all(ctx, next) {
        const tags = await TagRepo.all();
        console.log(tags);

        ctx.body = Code(SUCCESS, {
            tags: tags,
        })
    }
};

module.exports = TagHandler;