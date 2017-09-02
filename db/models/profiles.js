const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profile',
  auths: function() {
    return this.hasMany('Auth');
  }
});

module.exports = db.model('Profile', Profile);
