const axios = require('axios');

const { overstock } = require('../../config/api_configs/');
const { Transaction } = require('../../db/models');
axios.defaults.headers.common['Authorization'] = overstock.Authorization;
var convert = require('xml-js');


/**
 * Search overstock api with a given search term
 * @todo refactor to search database layer
 */
module.exports.search = (req, res) => {
  axios.get('https://product-search.api.cj.com/v2/product-search?', {
    params: {
      'website-id': overstock['website-id'],
      'keywords': req.body.searchTerm 
    }
  })
    .then(results => {
      res.json(JSON.parse(convert.xml2json(results.data)));
    })
    .catch(err => {
      console.log(err);
      res.status(405);
    });
};
