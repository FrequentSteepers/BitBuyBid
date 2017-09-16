'use strict';
const express = require('express');
const router = express.Router();
const {
  Transactions,
  Amazon
} = require('../controllers');

const {create, getAll, getOne, update, deleteOne} = Transactions;
const {createAmazonCart} = Amazon;

router.route('/')
  .all((req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).end();
    }
  })
  .get(getAll)
  .post(create)
;

router.route('/:id/amzn')
  .all((req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).end();
    }
  })
  .post(Amazon.createAmazonCart);

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