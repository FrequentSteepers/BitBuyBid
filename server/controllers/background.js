const axios = require('axios');

module.exports.getOne = (req, res) => {
  return axios.get('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=99a3b7cbd2e6389b7c5507e139cfb027&tags=background&per_page=20&page=1&format=rest&auth_token=72157685747829001-ed5efe5efc8b1b90&api_sig=9c7e52d8ed6817eceaa9c8db0b552be5')
    .then(res => {
      console.log('res: ', JSON.parse(res.data));
      return res.data;
    })
    .catch(err => console.log('error getting photo: ', err));
};