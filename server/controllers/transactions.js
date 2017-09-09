const {Transaction, Purchase} = require('../../db/models');
const axios = require('axios');
const {overstock} = require('../../config/api_configs/');
axios.defaults.headers.common['Authorization'] = overstock.Authorization;
var convert = require('xml-js');


module.exports.create = (req, res) => {
  Transaction.forge(
    { 
      buyer_id: req.user.id
    }
  )
    .save()
    .then(result => {
      console.log('new purchases', req.body.cart);
      return Promise.all(
        req.body.cart.map(
          p => Purchase.forge({
            transaction_id: result.id, 
            product_id: p.id,
            quantity: p.quantity || 1
          })
            .save()
        )
      );
    })
    .then(result => {
      res.status(201).end();
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
};

module.exports.getAll = (req, res) => {
  Transaction.where({buyer_id: req.user.id})
    .fetch()
    .then(transactions => {
      res.status(200).send(transactions);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.getOne = (req, res) => {
  Transaction.where({ id: req.params.id })
    .fetch()
    .then(transaction => {
      if (!transaction) {
        throw transaction;
      }
      res.status(200).send(transaction);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.update = (req, res) => {
  Transaction.where({ id: req.params.id })
    .fetch()
    .then(transaction => {
      if (!transaction) {
        throw transaction;
      }
      return transaction.save(req.body, { method: 'update' });
    })
    .then(() => {
      res.sendStatus(201);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.deleteOne = (req, res) => {
  Transaction.where({ id: req.params.id })
    .fetch()
    .then(transaction => {
      if (!transaction) {
        throw transaction;
      }
      return transaction.destroy();
    })
    .then(() => {
      res.sendStatus(200);
    })
    .error(err => {
      res.status(503).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};
