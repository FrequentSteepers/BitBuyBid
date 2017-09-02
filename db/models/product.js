const db = require('../');

const Product = db.Model.extend({
  tableName: 'products',
});

module.exports = db.model('Product', Product);
