const { Transaction } = require('../../db/models');


const { 
  associate_tag,
  access_key_id,
  secret_key
} = require('../../config/api_configs/amazon');

/**
 * Create an amazon cart from a transaction in the database
 */
module.exports.create = (req, res) => {
  // req.body.transaction_id
  Transaction.where({id: req.body.transaction_id}) 
    .fetch({
      withRelated: ['cart', 'buyer']
    })
    .then(transaction => {
      var url = 'http:// webservices.amazon.com/onca/xml?' +
      'Service=AWSECommerceService&' +
      `AWSAccessKeyId=${access_key_id}&` +
      'Operation=CartCreate&'; 
      var c = 1; 
      for (var i = 0; i < transaction.cart; i++) {
        if (transaction.cart[i].product.asin && transaction.cart[i].quantity) {
          url += `Item.${c}.ASIN=${transaction.cart[i].product.asin}&`;
          url += `Item.${c}.Quantity=${transaction.cart[i].quantity}&`;
          c++;
        }
      }
      url += `&Timestamp=[${new Date()}]`; // YYYY-MM-DDThh:mm:ssZ
      url += '&Signature=[Request Signature]';
      axios.get(url)
        .then(console.log);
    })
    .catch(err => {
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