const router = require('express').Router();
const { User } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
  //Acess our User model and run .findAll() method
  //SELECT * FROM users;
  User.findAll({
    attributes: {exclude: ['password']}
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
  //SELECT * FROM users WHERE id =
  User.findOne({
    attributes: {exclude: ['password']},
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users
router.post('/', (req, res) => {
  //INSERT INTO users
  //expects {username: '', email: '', password: ''}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {

  // Query operation
// expects {email: '', password: ''}
User.findOne({
  where: {
    email: req.body.email
  }
}).then(dbUserData => {
  if (!dbUserData) {
    res.status(400).json({ message: 'No user with that email address!' });
    return;
  }

  res.json({ user: dbUserData });

  // Verify user

}); 
})

// PUT /api/users/1
router.put('/:id', (req, res) => {
  // expects {username: '', email: '', password: ''}
  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  User.update(req.body, {
    //pass in req.body instead to only update what's passed through
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => { 
  //Delete data
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;