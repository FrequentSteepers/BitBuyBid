const db = require('../');

const Purchase = bookshelf.Model.extend({
  tableName: 'purchases',
  transaction: function() {
    return this.belongsTo('Transaction', 'transaction_id');
  },
  product: function() {
    return this.belongsTo('Product', 'product_id');
  }
});

module.exports = db.model('Purchase', Purchase);
