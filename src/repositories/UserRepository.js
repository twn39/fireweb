const User = require('../models/User');

class UserRepository {
    constructor(userModel) {
        this.user = userModel;
    }

    async find(id) {
        return await User.where('id', id).fetch();
    }
}

const repository = new UserRepository(User);

module.exports = repository;