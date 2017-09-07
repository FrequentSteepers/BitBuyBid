const axios = require('axios');

const { overstock } = require('../../config/api_configs/');
const { Product, Transaction } = require('../../db/models');
axios.defaults.headers.common['Authorization'] = overstock.Authorization;
var convert = require('xml-js');


/**
 * Search overstock api with a given search term
 * @todo refactor to search database layer
 */
module.exports.search = (req, res) => {
  if (!req.body.searchTerm) {
    console.log('no body!');
    res.status(405).end();
    return;
  }
  Product
    .query('where', 'title', 'like', `%${req.body.searchTerm.slice(1, -1)}%`)
    .fetchAll()
    .then(products => {
      if (products.length === 0) {
        throw products;
      }
      res.status(200).send(products);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(except => {
      console.log('new search term!' + req.body.searchTerm);
      return axios.get('https://product-search.api.cj.com/v2/product-search?', {
        params: {
          'website-id': overstock['website-id'],
          'keywords': req.body.searchTerm 
        }
      })
        .then(results => {
          Product.fromOverstock(results);
          res.json(JSON.parse(convert.xml2json(results.data)));
        })
        .catch(err => {
          console.log(err);
          res.status(404);
        });
    });
  
};
