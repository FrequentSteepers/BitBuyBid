
module.exports = (models) => {
  require('./overstock')(models);
  require('./amazon')(models);

  var CronJob = require('cron').CronJob;

  new CronJob('0 * * * *', function() {
    require('./overstock')(models);
  }, null, true, 'America/Los_Angeles');

  new CronJob('0 * * * *', function() {
    require('./amazon')(models);
  }, null, true, 'America/Los_Angeles');

};
