const {Transaction} = require('../../db/models');
const axios = require('axios');
const {overstock} = require('../../config/api_configs/');
axios.defaults.headers.common['Authorization'] = overstock.Authorization;
var convert = require('xml-js');


/**
 * 
 */
module.exports.create = (req, res) => {
  Transaction.forge(
    { 
      transaction: req.body.status,
      status: req.body.status,
      buyer_id: req.body.bodyId,
      seller_id: req.body.sellerId,
      session: req.session
    }
  )
    .save()
    .then(result => {
      res.status(201).send(result.omit('password'));
    })
    .catch(err => {
      if (err.constraint === 'users_username_unique') {
        return res.status(403);
      }
      res.status(500).send(err);
    });
};

module.exports.getAll = (req, res) => {
  res.status(401);
};

module.exports.getOne = (req, res) => {
  Transaction.where({ id: req.params.id }).fetch()
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
  Transaction.where({ id: req.params.id }).fetch()
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
  Transaction.where({ id: req.params.id }).fetch()
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
