const db = require('../db');
const parseString = require('xml2js').parseString;
const CryptoJS = require('crypto-js');
const axios = require('axios');
const { amazon } = require('../config/api_configs/');
const endpoint = 'webservices.amazon.com';
const uri = '/onca/xml';
const searchTerm = 'electronics'; // default category tag
const pairs = [];
const product_list = [];
const params = {
  'Service': 'AWSECommerceService',
  'Operation': 'ItemSearch',
  'AWSAccessKeyId': amazon.access_key_id,
  'AssociateTag': amazon.associate_tag,
  'SearchIndex': 'All',
  'Keywords': searchTerm,
  'ResponseGroup': 'Images,ItemAttributes'
};
const defaultImage = '';

let keys, canonical_query_string, string_to_sign, hash, signature, request_url, productListings;

if (!params.hasOwnProperty('Timestamp')) {
  params['Timestamp'] = new Date().toISOString();
}

keys = Object.keys(params).sort();

keys.forEach(key =>
  pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
);

canonical_query_string = pairs.join('&');

string_to_sign = `GET\n${endpoint}\n${uri}\n${canonical_query_string}`;

hash = CryptoJS.HmacSHA256(string_to_sign, amazon.secret_key);

signature = hash.toString(CryptoJS.enc.Base64);

request_url = `http://${endpoint}${uri}?${canonical_query_string}&Signature=` + encodeURIComponent(signature);


module.exports = ({Product}) => {
  console.log('API fetch');
  axios.get(request_url)
    .then(results => {
      parseString(results.data, function (err, result) {
        productListings = result.ItemSearchResponse.Items[0].Item;

        productListings.forEach((product) => {

          try {
            Product.forge(
              {
                'prod_id': product.ASIN[0] + '|AMZN',
                'asin': product.ASIN[0],
                'img_url_sm': product.SmallImage ? product.SmallImage[0].URL[0] : defaultImage,
                'img_url_md': product.MediumImage ? product.MediumImage[0].URL[0] : defaultImage,
                'img_url_lg': product.LargeImage ? product.LargeImage[0].URL[0] : defaultImage,
                'buy_url': product.DetailPageURL[0].substring(0, product.DetailPageURL[0].indexOf('?')),
                'title': product.ItemAttributes[0].Title[0],
                'price': product.ItemAttributes[0].ListPrice ? product.ItemAttributes[0].ListPrice[0].FormattedPrice[0].slice(1) : null,
                'description': product.ItemAttributes[0].Feature ? product.ItemAttributes[0].Feature.join('; ') : '',
                'type': 'amzn'
              }
            )
              .save()
              .then(() => console.log('success', product.ItemAttributes[0].Title[0]));
          } catch (e) {
            console.error(e);
          }
        });
      });
    })
    .catch(err => {
      console.log(err);
    });
};
