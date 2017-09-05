
module.exports = (models) => {
  require('./products')(models);
  var CronJob = require('cron').CronJob;
  new CronJob('* * * * *', function() {
    require('./products')(models);
  }, null, true, 'America/Los_Angeles'); 
};