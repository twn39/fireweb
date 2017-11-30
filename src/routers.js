const Router = require('koa-router');
const IndexHandler = require('./handlers/IndexHandler');
const AuthHandler = require('./handlers/AuthHandler');
const PostHandler = require('./handlers/PostHandler');
const UserHandler = require('./handlers/UserHandler');
const FollowHandler = require('./handlers/FollowHandler');
const CommentHandler = require('./handlers/CommentHandler');
const LikeHandler = require('./handlers/LikeHandler');
const CheckToken = require('./middlewares/CheckToken');

const router = new Router({
    prefix: '/v1',
});

const postRouter = new Router();

router.get('/', IndexHandler.index);
router.post('/signup', AuthHandler.signup);
router.post('/login', AuthHandler.login);
router.get('/token/refresh', CheckToken, AuthHandler.tokenRefresh);

//  users
router.put('/users/:id', CheckToken, UserHandler.update);
router.get('/users/:id/follow', CheckToken, FollowHandler.follow);
router.get('/users/:id/unfollow', CheckToken, FollowHandler.unFollow);

// posts
postRouter.post('/', CheckToken, PostHandler.add);
postRouter.get('/:id', PostHandler.show);
postRouter.put('/:id', PostHandler.update);
postRouter.delete('/:id', PostHandler.delete);
postRouter.get('/:id/like', LikeHandler.like);
postRouter.get('/:id/unlike', LikeHandler.unLike);

// comments
postRouter.get('/:id/comments/:id', CommentHandler.show);
postRouter.post('/:id/comments', CommentHandler.add);
postRouter.delete('/:id/comments/:id', CommentHandler.delete);

router.use('/posts', postRouter.routes());

module.exports = router;
