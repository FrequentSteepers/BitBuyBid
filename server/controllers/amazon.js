const { Transaction } = require('../../db/models');
const axios = require('axios');

const { 
  associate_tag,
  access_key_id,
  secret_key,
  signRequest
} = require('../../config/api_configs/amazon');

/**
 * Create an amazon cart from a transaction in the database
 */
module.exports.create = (req, res) => {
  // req.body.transaction_id
  Transaction.where({id: 1}) 
    .fetch({
      withRelated: ['cart', 'buyer']
    })
    .then(transaction => {
      var url = 'http://webservices.amazon.com/onca/xml?' +
      'Service=AWSECommerceService&' +
      `AWSAccessKeyId=${access_key_id}&` +
      'Operation=CartCreate&'; 
      var c = 1; 
      const items = transaction.relations.cart.models
        .map(o => o._previousAttributes);
      for (const item of items) {
        if (item.asin && item._pivot_quantity) {
          url += `Item.${c}.ASIN=${item.asin}&`;
          url += `Item.${c}.Quantity=${item._pivot_quantity}&`;
          c++;
        }
      }
      if (c === 1) {
        throw new Error('no data!');
      }
      console.log(signRequest(url));
      res.status(200).end();
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
};

module.exports.getAll = (req, res) => {
  res.status(500);
};

module.exports.getOne = (req, res) => {
  res.status(500);
};

module.exports.update = (req, res) => {
  res.status(500);
};

module.exports.deleteOne = (req, res) => {
  res.status(500);
};