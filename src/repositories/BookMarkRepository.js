const { BookMark } = require('../models/Models');
const DB = require('../models/DB');
const datefns = require('date-fns');
const PostRepo = require('./PostRepository');

class BookMarkRepository {

    async find(userId, postId) {
        return await BookMark.where('user_id', userId)
            .where('post_id', postId)
            .fetch();
    }

    async bookmark(userId, postId) {
        const post = await PostRepo.find(postId);
        if (post === null) {
            return false;
        }

        try {
            return await DB.transaction(async (t) => {

                const bookmark = new BookMark({
                    'post_id': postId,
                    'user_id': userId,
                    'created_at': datefns.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
                });

                await bookmark.save(null, {transacting: t});

                await post.save({
                    bookmarks: post.get('bookmarks') + 1,
                }, {patch: true, transacting: t});

                return true;
            });

        } catch (error) {
            console.log(error);
            return false;
        }

    }

    async unBookMark(userId, postId) {

        const post = await PostRepo.find(postId);
        if (post === null) {
            return false;
        }
        try {
            return DB.transaction(async (t) => {
                const bookmark = await this.find(userId, postId);

                if (bookmark === null) {
                    throw new Error('database likes table record is not exist.');
                }
                await BookMark.where('user_id', userId)
                    .where('post_id', postId)
                    .destroy({transacting: t});

                await post.save({
                    bookmarks: post.get('bookmarks') - 1,
                }, {patch: true, transacting: t});

                return true;
            })
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // async deleThisPic(id, index, $ind) {
    //     const that = this;
    //     const dele = await that.deleThisPicPromise(id);
    //     if (dele.code === 0) {
    //         const getPic = await that.getPicture(index);
    //         if (getPic.code === 0) {
    //             const data = await Promise.resolve(true).then(() => {
    //                 Vue.set();
    //                 Vue.set();
    //                 return that.picNum;
    //             })
    //         }
    //
    //         console.log(data);
    //     }
    // }


}

const bookmarkRepo = new BookMarkRepository();

module.exports = bookmarkRepo;

