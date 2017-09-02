const db = require('../');
const Product = require('./product');

const Category = db.Model.extend({
  tableName: 'categories',
});

module.exports = db.model('Category', Category);
