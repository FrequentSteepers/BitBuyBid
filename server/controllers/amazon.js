const { Transaction } = require('../../db/models');
const axios = require('axios');

const {buildAmazonRequest} = require('../../utils').amazon;

const convert = require('xml-js');

/**
 * Create an amazon cart from a transaction in the database.
 * A post to /:id (transaction_id) creates an amazon
 * cart and which is gettable from /:id
 */
module.exports.createAmazonCart = (req, res) => {
  let t;
  Transaction.where({id: req.params.id}) 
    .fetch({
      withRelated: ['cart', 'buyer']
    })
    .then(transaction => {
      t = transaction;
      var c = 1; 
      const items = transaction.relations.cart.models
        .map(o => o._previousAttributes);
      let params = {
        Operation: 'CartCreate',
        Service: 'AWSECommerceService'
      };
      for (const item of items) {
        if (item.asin && item._pivot_quantity) {
          params[`Item.${c}.ASIN`] = item.asin;
          params[`Item.${c}.Quantity`] = item._pivot_quantity;
          c++;
        }
      }
      if (c === 1) {
        throw new Error('no data!');
      }
      return axios.get(buildAmazonRequest(params));
    })
    .then(results => {
      const parsed = JSON.parse(convert.xml2json(results.data,
        {
          compact: true,
          spaces: 2,
          instructionHasAttributes: true
        }
      ));
      const response = {
        amzn_cart_id: parsed.CartCreateResponse.Cart.CartId._text,
        amzn_HMAC: parsed.CartCreateResponse.Cart.HMAC._text,
        amzn_URLEncodedHMAC: parsed.CartCreateResponse.Cart.URLEncodedHMAC._text,
      };
      return t.save(response).then(() => 
        res.status(201).end()
      );
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
};

module.exports.getAmazonCart = (req, res) => {
  Transaction.where({id: req.params.id})
    .fetch()
    .then(transaction => {
      let params = {
        Service: 'AWSECommerceService',
        Operation: 'CartGet',
        CartId: `${transaction.toJSON().amzn_cart_id}`,
        HMAC: `${transaction.toJSON().amzn_HMAC}` 
      };
      return axios.get(buildAmazonRequest(params));
    })
    .then(results => {
      const parsed = JSON.parse(convert.xml2json(results.data,
        {
          compact: true,
          spaces: 2,
          instructionHasAttributes: true
        }
      ));
      try {
        const response = {
          PurchaseURL: parsed.CartGetResponse.cart.PurchaseURL._text,
        };
        res.json(response).status(200);
      } catch (e) {
        res.status(405).end();
      }
    })
    .catch(err => {
      if (err.status !== 503) {
        console.error(err);
      }
      res.status(500).end();
    });
};