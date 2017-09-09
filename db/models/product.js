const db = require('../');
const convert = require('xml-js');

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
        .catch(console.error);
    } catch (e) {
      console.error(e);
    }
  });
};

module.exports = db.model('Product', Product);
