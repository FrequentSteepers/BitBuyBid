'use strict';
const express = require('express');
const router = express.Router();
const {
  getAll, 
  getOne, 
  update, 
  deleteOne,
  create
} = require('../controllers').Products;

router.route('/')
  .get(getAll)
  .post(create)
;

router.route('/:id')
  .get(getOne)
  .put(update)
  .delete(deleteOne);

module.exports = router;