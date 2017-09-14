const axios = require('axios');

module.exports = () => {
  return axios.get('https://api.coinbase.com/v2/prices/spot?currency=USD')
    .then((data) => {
      return data.data.amount;    
    });
};