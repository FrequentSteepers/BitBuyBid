const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Users.fetchAll()
    .then(profiles => {
      res.status(200).send(profiles);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.create = (req, res) => {
  models.User.forge(req.body)
    .save()
    .then(result => {
      res.status(201).send(result.omit('password'));
    })
    .catch(err => {
      if (err.constraint === 'users_username_unique') {
        return res.status(403);
      }
      res.status(500).send(err);
    });
};

module.exports.getOne = (req, res) => {
  models.User.where({ id: req.params.id })
    .fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      res.status(200).send(profile);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.update = (req, res) => {
  models.User.where({ id: req.params.id }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      return profile.save(req.body, { method: 'update' });
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

module.exports.createActiveCart = (req, res) => {
  if (!req.body.cart || req.body.cart.length === 0) {
    res.status(405).send('You must have a cart');
  }
  if (req.params.id !== req.user.id) {
    res.status(401).send('You must be logged in');
  }
  let builtTransaction = {};
  Transaction.forge(
    { 
      buyer_id: req.user.id		
    }
  )
    .save()
    .then(result => {
      builtTransaction = result;
      builtTransaction.cart = [];
      return Promise.all(
        req.body.cart.map(
          p => {
            Purchase.forge({
              transaction_id: result.id, 
              product_id: p.id,
              quantity: req.body.quantities[p.prod_id] || 1
            })
              .save();
          }
        )
      );
    })
    .then(result => {
      return models.User.where({id: req.params.id})
        .fetch()
        .then(profile => {
          if (!profile) {
            throw profile;
          }
          return profile.save(
            {
              'active_cart': builtTransaction.id
            }, 
            { 
              method: 'update' 
            }
          );
        });
    })
    .then(() => {
      res.json(builtTransaction).sendStatus(201);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    })
    .error(err => {
      res.status(500).send(err);
    });
};
