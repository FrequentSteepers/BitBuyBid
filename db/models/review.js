const db = require('../');

const Review = db.Model.extend({
  tableName: 'reviews',
});

module.exports = db.model('Review', Review);
