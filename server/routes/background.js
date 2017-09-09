'use strict'
const express = require('express');
const router = express.Router();
const {getOne} = require('../controllers').Background;

router.route('/')
  .get(getOne);

module.exports = router;