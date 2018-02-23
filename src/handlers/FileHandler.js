const Qiniu = require('qiniu');
const { SUCCESS, SERVER_ERROR } = require('../helpers/ErrorCode');
const Code = require('../helpers/Code');

const accessKey = process.env.QINIU_ACCESSKEY;
const secretKey = process.env.QINIU_SECRETKEY;
const bucket = process.env.QINIU_BUCKET;

const mac = new Qiniu.auth.digest.Mac(accessKey, secretKey);
const putPolicy = new Qiniu.rs.PutPolicy({
    scope: bucket,
});

class FileHandler {

    async token(ctx, next) {
        const token = putPolicy.uploadToken(mac);
        ctx.body = Code(SUCCESS, {
            token,
        });
    }

}

module.exports = new FileHandler();