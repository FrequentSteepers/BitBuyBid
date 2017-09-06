const db = require('../');

const Transaction = db.Model.extend({
  tableName: 'transactions',
  buyer: function() {
    return this.belongsTo('User', 'buyer_id');
  },
  seller: function() {
    return this.belongsTo('User', 'seller_id');
  },
  review: function() {
    return this.hasOne('Product');
  }
});

module.exports = db.model('Transaction', Transaction);
