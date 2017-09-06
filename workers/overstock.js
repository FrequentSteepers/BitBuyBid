const axios = require('axios');

const { overstock } = require('../config/api_configs/');
axios.defaults.headers.common['Authorization'] = overstock.Authorization;
const convert = require('xml-js');

/**
 * Query overstock api with each category and insert the resulting
 * data into the database.
 */
module.exports = ({Product}) => {
  console.log('api fetch');
  axios.get('https://product-search.api.cj.com/v2/product-search?', {
    params: {
      'website-id': overstock['website-id'],
      'keywords': 'electronics'
    }
  })
    .then(results => {
      const parsed = JSON.parse(convert.xml2json(results.data,
        {
          compact: true,
          spaces: 2,
          instructionHasAttributes: true
        }
      ))['cj-api'].products.product;
      parsed.forEach(p => {
        try {
          Product.forge(
            {
              'prod_id': p['ad-id']._text + p['sku']._text + p['upc']._text + '|OVSOCK',
              'ad-id': Number.parseInt(p['ad-id']._text) || null,
              'sku': Number.parseInt(p['sku']._text) || null,
              'upc': Number.parseInt(p['upc']._text) || null,
              'catalog_id': p['catalog-id']._text.replace(/\D/g, ''),
              'price': Number(p.price['_text']),
              'buy_url': p['buy-url']._text,
              'type': 'ovsock',
              'title': p.name._text,
              'description': p.description._text
            }
          )
            .save()
            .then(() => console.log('success', p.name._text));
        } catch (e) {
          console.error(e);
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
};
