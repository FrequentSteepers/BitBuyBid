const axios = require('axios');
const { overstock, amazon } = require('../../config/api_configs/');
const { Product, Transaction } = require('../../db/models');
const convert = require('xml-js');
const parseString = require('xml2js').parseString;
const CryptoJS = require('crypto-js');
const endpoint = 'webservices.amazon.com';
const uri = '/onca/xml';
var pairs = [];
var product_list = [];

const params = {
  'Service': 'AWSECommerceService',
  'Operation': 'ItemSearch',
  'AWSAccessKeyId': amazon.access_key_id,
  'AssociateTag': amazon.associate_tag,
  'SearchIndex': 'All',
  'Keywords': '',
  'ResponseGroup': 'Images,ItemAttributes'
};

const defaultImage = '';

let keys, canonical_query_string, string_to_sign, hash, signature, request_url, productListings;


/**
 * Search overstock api with a given search term
 * @todo refactor to search database layer
 */
module.exports.search = (req, res) => {

  console.log('req.body.searchTerm.length ', req.body.searchTerm);
  if (!req.body.searchTerm || req.body.searchTerm.trim().length < 2) {
    console.log('no body!');
    // res.status(405).end();
    return;
  }

  Product
    .query((qb) => { qb.whereRaw(`TRIM(LOWER(title)) LIKE '%${req.body.searchTerm.trim().toLowerCase()}%'`).andWhere('type', '=', 'amzn').offset(0).limit(20); })
    .fetchAll()
    .then(products => {
      if (products.length === 0) {
        console.log('yo dawg', amazon.secret_key);
        throw products;
      }
      console.log('i am bad man');
      res.status(200).send({results: products});
    })
    .error(err => {
      console.log('oh snap');
      res.status(500).send(err);
    })
    .catch(except => {
      params['Timestamp'] = new Date().toISOString();
      params['Keywords'] = req.body.searchTerm;

      keys = Object.keys(params).sort();
      pairs = [];
      keys.forEach(key =>
        pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
      );

      canonical_query_string = pairs.join('&');

      string_to_sign = `GET\n${endpoint}\n${uri}\n${canonical_query_string}`;

      hash = CryptoJS.HmacSHA256(string_to_sign, amazon.secret_key);

      signature = hash.toString(CryptoJS.enc.Base64);

      request_url = `http://${endpoint}${uri}?${canonical_query_string}&Signature=` + encodeURIComponent(signature);

      let linksArray = [
        // {
        //   url: 'https://product-search.api.cj.com/v2/product-search?',
        //   params: {
        //     'website-id': overstock['website-id'],
        //     'keywords': req.body.searchTerm
        //   }
        // },
        {
          url: request_url
        }
      ];

      let promiseArray = linksArray.map( url =>
        axios.get(url.url)
          .then(results => {
            if (url.url === 'https://product-search.api.cj.com/v2/product-search?') {
            // Product.fromOverstock(results);
            // res.json(JSON.parse(convert.xml2json(results.data)));
            } else {
              Product.fromAmzn(results);
              product_list = [];

              parseString(results.data, function (err, result) {
                productListings = result.ItemSearchResponse.Items[0].Item;

                productListings.forEach((product) => {
                  product_list.push({
                    'prod_id': product.ASIN[0] + '|AMZN',
                    'asin': product.ASIN[0],
                    'img_url_sm': product.SmallImage ? product.SmallImage[0].URL[0] : defaultImage,
                    'img_url_md': product.MediumImage ? product.MediumImage[0].URL[0] : defaultImage,
                    'img_url_lg': product.LargeImage ? product.LargeImage[0].URL[0] : defaultImage,
                    'buy_url': product.DetailPageURL[0].substring(0, product.DetailPageURL[0].indexOf('?')),
                    'title': product.ItemAttributes[0].Title[0],
                    'price': product.ItemAttributes[0].ListPrice ? Number(product.ItemAttributes[0].ListPrice[0].FormattedPrice[0].slice(1)) : null,
                    'description': product.ItemAttributes[0].Feature ? product.ItemAttributes[0].Feature.join('; ') : '',
                    'type': 'amzn'
                  });
                });

                res.send({results: product_list});
              });
            }
          })
          .catch(err => {
            console.log(err);
            res.status(404);
          }) );

    });
};
