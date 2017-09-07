const { Product } = require('../../db/models');


module.exports.create = (req, res) => {
  Product.create(req.body)
    .then(status => {
      res.status(201);
    })
    .catch(err => {
      console.log(err);
      res.status(405);
    });
};

module.exports.getAll = (req, res) => {
  Product.where({})
    .fetchAll()
    .then(product => {
      if (!product) {
        throw product;
      }
      res.status(200).send(product);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.getOne = (req, res) => {
  Product.where({ id: req.params.id })
    .fetch()
    .then(product => {
      if (!product) {
        throw product;
      }
      res.status(200).send(product);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.update = (req, res) => {
  Product.where({ id: req.params.id })
    .fetch()
    .then(product => {
      if (!product) {
        throw product;
      }
      return product.save(req.body, { method: 'update' });
    })
    .then(() => {
      res.sendStatus(201);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.deleteOne = (req, res) => {
  models.Product.where({ id: req.params.id })
    .fetch()
    .then(product => {
      if (!product) {
        throw product;
      }
      return product.destroy();
    })
    .then(() => {
      res.sendStatus(200);
    })
    .error(err => {
      res.status(503).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};
