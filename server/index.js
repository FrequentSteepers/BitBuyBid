'use strict';
const app = require('./app');
const models = require('../db/models');
const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

// start cronjobs
require('../workers')(models);