const { Transaction } = require('../../db/models');
const axios = require('axios');

const {buildAmazonRequest} = require('../../utils').amazon;

const convert = require('xml-js');

/**
 * Create an amazon cart from a transaction in the database
 */
module.exports.getOne = (req, res) => {
  Transaction.where({id: req.params.id}) 
    .fetch({
      withRelated: ['cart', 'buyer']
    })
    .then(transaction => {
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
      transaction.save(response).then(() => console.log('success!'));
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
};