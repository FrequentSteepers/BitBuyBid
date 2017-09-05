const db = require('../');

const Review = db.Model.extend({
  tableName: 'reviews',
  author: function() {
    return this.hasMany('User', 'author_id');
  },
  seller: function() {
    return this.hasMany('Product', 'seller_id');
  },
});

module.exports = db.model('Review', Review);
