const db = require('../');

const Purchase = db.Model.extend({
  tableName: 'purchases',
  transaction: function() {
    return this.belongsTo('Transactions', 'transaction_id', 'id');
  },
  product: function() {
    return this.belongsTo('Products', 'product_id', 'id');
  }
});

module.exports = db.model('Purchase', Purchase);
