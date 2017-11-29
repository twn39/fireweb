const Router = require('koa-router');
const IndexHandler = require('./handlers/IndexHandler');
const AuthHandler = require('./handlers/AuthHandler');
const CheckToken = require('./middlewares/CheckToken');

const router = new Router({
    prefix: '/v1',
});

router.get('/', IndexHandler.index);
router.post('/signup', AuthHandler.signup);
router.post('/login', AuthHandler.login);
router.get('/token/refresh', CheckToken, AuthHandler.tokenRefresh);

//  users


module.exports = router;
