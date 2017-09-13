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
  .all((req, res, next) => {
    console.log('auth: ', req.isAuthenticated());
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).end();
    }
  })
  .get(getAll)
  .post(create)
;

router.route('/:id')
  .all((req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).end();
    }
  })
  .get(getOne)
  .put(update)
  .delete(deleteOne);

module.exports = router;