const db = require('../');

const AmazonPurchase = db.Model.extend({
  tableName: 'amazon_purchases',
  purchases: function() {
    return this.morphOne('Purchase');
  }
});

module.exports = db.model('amazon_purchase', AmazonPurchase);
