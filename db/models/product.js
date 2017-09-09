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
    try {
      Product.forge(
        {
          'prod_id': p['ad-id']._text + p['sku']._text + p['upc']._text + '|OVSOCK',
          'ad-id': Number.parseInt(p['ad-id']._text || 0) || null,
          'sku': Number.parseInt(p['sku']._text) || null,
          'upc': Number.parseInt(p['upc']._text) || null,
          'catalog_id': p['catalog-id']._text,
          'price': Number(p.price['_text']),
          'buy_url': p['buy-url']._text,
          'type': 'ovsock',
          'title': p.name._text,
          'description': p.description._text,
          'img_url_sm': p['image-url']._text || '',
          'img_url_md': p['image-url']._text || '',
          'img_url_lg': p['image-url']._text || ''
        }
      )
        .save()
        .then(() => console.log('success overstock'))
        .catch(console.error);
    } catch (e) {
      console.error(e);
    }
  });
};

Product.fromAmzn = (results) => {
  parseString(results.data, function (err, result) {
    let productListings = result.ItemSearchResponse.Items[0].Item;

    productListings.forEach((product) => {
      console.log('forging amazon product');
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
            'price': product.ItemAttributes[0].ListPrice ? Number(product.ItemAttributes[0].ListPrice[0].FormattedPrice[0].slice(1)) : null,
            'description': product.ItemAttributes[0].Feature ? product.ItemAttributes[0].Feature.join('; ') : '',
            'type': 'amzn'
          }
        )
          .save()
          .then(() => { console.log('success', product.ItemAttributes[0].Title[0]); return productListings; });
      } catch (e) {
        console.error(e);
      }
    });
  });
};

module.exports = db.model('Product', Product);
