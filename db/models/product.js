const db = require('../');
const convert = require('xml-js');
const parseString = require('xml2js').parseString;

const Product = db.Model.extend({
  tableName: 'products',
  tags: function() {
    return this.hasMany('Tag');
  },
  category: function() {
    return this.hasOne('Category');
  }
});

const defaultImage = '';

/**
 * Bulk create products by fetching product data from overstock api
 * and converting the data to json from xml.
 *
 * @todo associate inserted products to category/ tag.
 */
Product.fromOverstock = (results) => {
  const parsed = JSON.parse(convert.xml2json(results.data,
    {
      compact: true,
      spaces: 2,
      instructionHasAttributes: true
    }
  ))['cj-api'].products.product;
  parsed.forEach(p => {

    Product.query((qb) => { qb.whereRaw(`prod_id = '${p['ad-id']._text + p['sku']._text + p['upc']._text}|OVSOCK'`).andWhere('type', '=', 'ovsock').limit(1); })
      .fetchAll()
      .then(products => {
        if (products && products.length > 0) {
          // 'item found in db, skipping...'
        } else {
          // insert new item
          console.log('...adding new overstock product to db with identifier', p['ad-id']._text + p['sku']._text + p['upc']._text);

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
            .save();
        }
      }).catch(e => {
        console.log('error occured querying products');
        console.error(e);
      });
  });
};

Product.fromAmzn = (results) => {
  parseString(results.data, function (err, result) {
    let productListings = result.ItemSearchResponse.Items[0].Item;

    productListings.forEach((product) => {

      Product.query((qb) => { qb.whereRaw(`prod_id = '${product.ASIN[0]}|AMZN'`).andWhere('type', '=', 'amzn').limit(1); })
        .fetchAll()
        .then(products => {
          if (products && products.length > 0) {
            // 'item found in db, skipping...'
          } else {
            // insert new item
            console.log('...adding new amazon product to db with identifier', product.ASIN[0]);

            Product.forge(
              {
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
              }
            )
              .save()
              .then(() => { console.log('success', product.ItemAttributes[0].Title[0]); return productListings; });
          }
        }).catch(e => {
          console.log('error occured querying products');
          console.error(e);
        });
    });
  });
};

module.exports = db.model('Product', Product);
