const models = require('../../db/models');


const generateMockData = number => {
  var productTitles = ['Peanut butter', 'Kikiriki', 'Cacauet', 'Maní', 'Eros'];
  var results = [];
  for (var i = 0; i < number; i++ ) {
    results.push({
      id: i,
      imgs: {
        small: 'https://images.freshop.com/00070690282000/246f35b9481cc6a61446f25cb80875c1_medium.png',
        medium: 'http://s.eatthis-cdn.com/media/images/ext/551146431/peanut-butter-ranked-nutsnmore-Peanut-Reg.jpg',
        large: 'https://cdn.shopify.com/s/files/1/0923/2946/products/SmoothOp-1024.jpg?v=1502224339',
      },
      title: productTitles[i % productTitles.length],
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
          ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
          in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
          mollit anim id est laborum.`,
      rating: Math.random() * 5,
      seller: 50 * Math.random(),
      price: 50 * Math.random()
    });
  }
  return results;
};

var fakeDb = generateMockData(50);

/**
 * 
 * @todo reference persisted data. 
 */
module.exports.getAll = (req, res) => {
  res.json({
    results: fakeDb.slice(0, 15) 
  });
};

module.exports.getOne = (req, res) => {
  if (fakeDb.length <= req.params.id) {
    res.status(404);
  }
  res.json({
    results: fakeDb[req.params.id]
  });
};

module.exports.update = (req, res) => {
  fakeDb[req.body.id] = req.body;
  res.json({
    updated: req.params.id
  });
};

module.exports.deleteOne = (req, res) => {
  fakeDb = fakeDb.map((e, i) => i !== req.params.id);
  res.json({
    deleted: req.params.id
  });
};
