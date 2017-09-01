'use strict';
const express = require('express');
const router = express.Router();
const {getAll, getOne, update} = require('../controllers').Users;

router.route('/')
  .get(getAll);

router.route('/:id')
  .get(getOne)
  .put(update);

module.exports = router;
