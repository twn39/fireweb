const { Tag } = require('../models/Models');
const datefns = require('date-fns');

class TagRepository {
    async all() {
        const tags = await Tag.query(qb => {
            qb.select('*')
                .orderBy('weight', 'desc')
                .limit(20);
        }).fetchAll();
        return tags.toJSON();
    }

    async add(name, weight = 0) {
        const tag = new Tag({
            name: name,
            weight: weight,
            'created_at': datefns.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
        });

        return await tag.save();
    }

    async delete(id) {
        await Tag.where('id', id)
            .destroy();

        return true;
    }
}

const tagRepo = new TagRepository();

module.exports = tagRepo;
