const db = require('../');

const Transaction = db.Model.extend({
  tableName: 'transaction',
});

module.exports = db.model('transaction', Transaction);
