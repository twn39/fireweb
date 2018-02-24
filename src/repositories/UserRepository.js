const { User } = require('../models/Models');
const datefns = require('date-fns');
const bcrypt = require('bcryptjs');

class UserRepository {
    /**
     *
     * @param id
     * @returns {Promise<*>}
     */
    async find(id) {
        return await User.where('id', id).fetch();
    }

    /**
     *
     * @param username
     * @param email
     * @param password
     * @returns {Promise<*>}
     */
    async add(username, email, password) {
        const usernameExist = await this.findByUserName(username);

        if (usernameExist) {
            return false;
        }

        const emailExist = await this.findByEmail(email);

        if (emailExist) {
            return false;
        }

        const passwordHash = await bcrypt.hash(password, 10);

        let user = new User({
            username: username,
            email: email,
            password: passwordHash,
            avatar: '',
            created_at: datefns.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
            updated_at: datefns.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
        });

        return await user.save();
    }

    /**
     *
     * @param uid
     * @param data
     * @returns {Promise<*>}
     */
    async update(uid, data) {
        const user = await this.find(uid);
        return await user.save(data, { patch: true });
    }

    /**
     *
     * @param username
     * @returns {Promise<*>}
     */
    async findByUserName(username) {
        return await User.where('username', username).fetch();
    }

    /**
     *
     * @param email
     * @returns {Promise<*>}
     */
    async findByEmail(email) {
        return await User.where('email', email).fetch();
    }

    /**
     *
     * @returns {Promise<*>}
     */
    async newcomers() {
        return await User.query(qb => {
            qb.orderBy('id', 'desc')
                .limit(10);
        }).fetchAll();
    }

}

const repository = new UserRepository();

module.exports = repository;
