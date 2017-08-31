'use strict';
const express = require('express');
const router = express.Router();
const {
  getAll, 
  getOne, 
  update, 
  deleteOne
} = require('../controllers').Products;

router.route('/')
  .get(getAll)
  // .post(ProfileController.create)
;

router.route('/:id')
  .get(getOne)
  .put(update)
  .delete(deleteOne);

module.exports = router;