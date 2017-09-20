const db = require('../');
const Purchase = require('./purchase');

const AmazonPurchase = db.Model.extend({
  tableName: 'amazon_purchases',
  receipt: function() {
    return this.morphOne(Purchase);
  }
});

module.exports = db.model('amazon_purchase', AmazonPurchase);
