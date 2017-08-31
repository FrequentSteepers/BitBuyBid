'use strict';
const express = require('express');
const router = express.Router();
const {getAll, getOne, update} = require('../controllers').Users;

router.route('/')
  .get(getAll)
  // .post(ProfileController.create)
  ;

router.route('/:id')
  .get(getOne)
  .put(update)
  // .delete(ProfileController.deleteOne)
  ;

module.exports = router;
