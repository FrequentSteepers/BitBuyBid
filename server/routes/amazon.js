'use strict';
const express = require('express');
const router = express.Router();
const {getOne} = require('../controllers').Amazon;

router.route('/:id')
  .post(getOne);

module.exports = router;
