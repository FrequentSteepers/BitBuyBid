const db = require('../');

const Product = db.Model.extend({
  tableName: 'product',
});

module.exports = db.model('product', Product);
