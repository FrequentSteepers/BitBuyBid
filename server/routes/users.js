'use strict';
const express = require('express');
const router = express.Router();
const {
  getAll, 
  getOne, 
  update,
  createActiveCart,
} = require('../controllers').Users;

router.route('/')
  .get(getAll);

router.route('/:id')
  .get(getOne)
  .put(update);

router.route('/:id/cart')
  .post(createActiveCart);

module.exports = router;
