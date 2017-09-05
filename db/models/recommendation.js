const db = require('../');

const Recommendation = db.Model.extend({
  tableName: 'recommendations',
});

module.exports = db.model('Recommendation', Recommendation);
