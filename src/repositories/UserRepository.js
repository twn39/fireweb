const User = require('../models/User');

class UserRepository {

    async find(id) {
        return await User.where('id', id).fetch();
    }

    async add(username, email, password) {

        const usernameExist = await this.findByUserName(username);

        if (usernameExist) {
            return false;
        }

        const emailExist = await this.findByEmail(email);

        if (emailExist) {
            return false;
        }

        const user = new User({
            username: username,
            email: email,
            password: password
        });

        return await user.save();
    }

    async findByUserName(username) {
        return await User.where('username', username).fetch();
    }

    async findByEmail(email) {
        return await User.where('email', email).fetch();
    }
}

const repository = new UserRepository();

module.exports = repository;