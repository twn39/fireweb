const DB = require('./DB');

const User = DB.Model.extend({
  tableName: 'users',
});

module.exports = User;
