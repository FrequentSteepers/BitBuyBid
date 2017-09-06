if (!process.env.TRAVIS) {
  module.exports = {
    overstock: require('./overstock'),
    amazon: require('./amazon') 
  };
} else {
  module.exports = {
    overstock: {
      'website-id': 'travis',
      Authorization: 'travis'
    },
    amazon: {
      associate_tag: 'travis',
      access_key_id: 'travis',
      secret_key: 'travis'
    }
  };
}
