'use strict';
const express = require('express');
const router = express.Router();
const {create, getAll, getOne, update} = require('../controllers').Amazon;

router.route('/')
  .get(getAll)
  .post(create);

router.route('/:id')
  .get(getOne)
  .put(update);

module.exports = router;
