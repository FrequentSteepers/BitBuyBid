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

Product.fromOverstock = (results, tagId) => {
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
        .save();
    } catch (e) {
      console.error(e);
    }
  });
};

module.exports = db.model('Product', Product);
