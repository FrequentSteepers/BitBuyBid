const db = require('../');

const Category = db.Model.extend({
  tableName: 'categories',
});

module.exports = db.model('categories', Category);
