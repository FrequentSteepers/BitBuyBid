
module.exports = (models) => {
  require('./products')(models);
  var CronJob = require('cron').CronJob;
  new CronJob('0 * * * *', function() {
    require('./products')(models);
  }, null, true, 'America/Los_Angeles'); 
};