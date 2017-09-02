'use strict';
const express = require('express');
const router = express.Router();
const {
  create,
  getAll, 
  getOne, 
  update, 
  deleteOne
} = require('../controllers').Transactions;

router.route('/')
  .get(getAll)
  .post(create)
;

router.route('/:id')
  .get(getOne)
  .put(update)
  .delete(deleteOne);

module.exports = router;