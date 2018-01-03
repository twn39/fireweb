const Router = require('koa-router');
const IndexHandler = require('./handlers/IndexHandler');
const AuthHandler = require('./handlers/AuthHandler');
const PostHandler = require('./handlers/PostHandler');
const UserHandler = require('./handlers/UserHandler');
const FollowHandler = require('./handlers/FollowHandler');
const CommentHandler = require('./handlers/CommentHandler');
const LikeHandler = require('./handlers/LikeHandler');
const BookMarkHandler = require('./handlers/BookMarkHandler');
const FileHandler = require('./handlers/FileHandler');
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
router.get('/users/search', UserHandler.search);
router.post('/users/:id/avatar', UserHandler.avatar);

// posts
postRouter.get('/', PostHandler.index);
postRouter.post('/', CheckToken, PostHandler.add);
postRouter.get('/:id', PostHandler.show);
postRouter.put('/:id', PostHandler.update);
postRouter.delete('/:id', PostHandler.delete);
postRouter.get('/:id/like', CheckToken, LikeHandler.like);
postRouter.get('/:id/unlike', CheckToken, LikeHandler.unLike);
postRouter.get('/:id/bookmark', CheckToken, BookMarkHandler.bookmark);
postRouter.get('/:id/unbookmark', CheckToken, BookMarkHandler.unBookMark);
postRouter.get('/search', PostHandler.search);

// comments
postRouter.get('/:id/comments', CommentHandler.index);
postRouter.post('/:id/comments', CheckToken, CommentHandler.add);
postRouter.delete('/:pid/comments/:cid', CheckToken, CommentHandler.delete);

router.use('/posts', postRouter.routes());

router.get('/file/token', CheckToken, FileHandler.token);

module.exports = router;
