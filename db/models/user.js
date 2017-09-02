const db = require('../');

const User = db.Model.extend({
  tableName: 'users',
  auths: function() {
    return this.hasMany('Auth');
  },
  activeCart: function() {
    return this.belongsTo('Transaction');
  }
});

module.exports = db.model('User', User);
