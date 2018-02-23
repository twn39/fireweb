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
const TagHandler = require('./handlers/TagHandler');
const CheckToken = require('./middlewares/CheckToken');
const ParseToken = require('./middlewares/ParseToken');

const router = new Router({
    prefix: '/v1',
});

const postRouter = new Router();

router.get('/', IndexHandler.index);
router.post('/signup', AuthHandler.signup);
router.post('/login', AuthHandler.login);
router.get('/token/refresh', CheckToken, AuthHandler.tokenRefresh);

//  users
router.get('/users/:id(\\d+)', ParseToken, UserHandler.get);
router.put('/users/:id(\\d+)', CheckToken, UserHandler.update);
router.get('/users/:id(\\d+)/follow', CheckToken, FollowHandler.follow);
router.get('/users/:id(\\d+)/unfollow', CheckToken, FollowHandler.unFollow);
router.post('/users/:id(\\d+)/avatar', UserHandler.avatar);
router.get('/users/:id(\\d+)/posts', UserHandler.userPosts);
router.get('/users/:id(\\d+)/bookmarks', UserHandler.userBookmarks);
router.get('/users/:id(\\d+)/banner', UserHandler.banner);
router.post('/users/:id(\\d+)/banner', CheckToken, UserHandler.postBanner);
router.get('/users/newcomers', UserHandler.newcomers);
router.get('/users/search', UserHandler.search);

// posts
postRouter.get('/', PostHandler.index);
postRouter.post('/', CheckToken, PostHandler.add);
postRouter.get('/today/hot', PostHandler.todayHot);
postRouter.get('/:id(\\d+)', ParseToken, PostHandler.show);
postRouter.put('/:id(\\d+)', PostHandler.update);
postRouter.delete('/:id(\\d+)', PostHandler.delete);
postRouter.get('/:id(\\d+)/like', CheckToken, LikeHandler.like);
postRouter.get('/:id(\\d+)/unlike', CheckToken, LikeHandler.unLike);
postRouter.get('/:id(\\d+)/bookmark', CheckToken, BookMarkHandler.bookmark);
postRouter.get('/:id(\\d+)/unbookmark', CheckToken, BookMarkHandler.unBookMark);
postRouter.get('/search', PostHandler.search);

// comments
postRouter.get('/:id(\\d+)/comments', CommentHandler.index);
postRouter.post('/:id(\\d+)/comments', CheckToken, CommentHandler.add);
postRouter.delete('/:pid(\\d+)/comments/:cid(\\d+)', CheckToken, CommentHandler.delete);

router.use('/posts', postRouter.routes());

router.get('/file/token', CheckToken, FileHandler.token);

router.get('/tags', TagHandler.all);

module.exports = router;
