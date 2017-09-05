module.exports = (models) => {
  var CronJob = require('cron').CronJob;
  new CronJob('* * * * *', function() {
    require('./tags')(models);
  }, null, true, 'America/Los_Angeles'); 
};