const db = require('../');
const Amazon = require('./amazon');
const Stripe = require('./stripe');


const Purchase = db.Model.extend({
  tableName: 'purchases',
  transaction: function() {
    return this.belongsTo('Transactions', 'transaction_id', 'id');
  },
  product: function() {
    return this.belongsTo('Products', 'product_id', 'id');
  },
  review: function() {
    return this.belongsTo('Reviews', 'review_id', 'id');
  },
  receipt: function() {
    return this.morphTo('receipt', ['receipt_type', 'receipt_id'], 'stripe_purchase', 'amazon_purchase');
  }
});

module.exports = db.model('Purchase', Purchase);
