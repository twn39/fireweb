const Router = require('koa-router');
const IndexHandler = require('./handlers/IndexHandler');
const AuthHandler = require('./handlers/AuthHandler');

const router = new Router({
    prefix: '/v1'
});

router.get('/', IndexHandler.index);
router.post('/signup', AuthHandler.signup);

module.exports = router;
