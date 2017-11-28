
const UserRepo = require('../repositories/UserRepository');

const AuthHandler = {
    async signup(ctx, next) {

        const user = await UserRepo.find(1);
        ctx.body = user;
    }
};

module.exports = AuthHandler;