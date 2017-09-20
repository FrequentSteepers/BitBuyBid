const db = require('../');
const Purchase = require('./purchase');

const StripePurchase = db.Model.extend({
  tableName: 'stripe_purchases',
  purchases: function() {
    return this.morphOne('Purchase');
  }
});

module.exports = db.model('stripe_purchase', StripePurchase);
