const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

const { ObjectForError } = require('../validation/errors');

module.exports.getUser = (req, res, next) => {
  if (!req.user) {
    next(new ObjectForError('NotAutorisation'));
    return;
  }

  const id = req.user._id;

  User.findById(id)
    .orFail(new ObjectForError('ObjectNotFound'))
    .then((user) => res.json(user))
    .catch(next);
}

module.exports.createUser = (req, res, next) => {
  const { email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ email, password: hash })
        .then((user) => {
          const id = user._id;
          User.findById(id)
            .orFail(new ObjectForError('ObjectNotFound'))
            .then((data) => res.json(data))
            .catch(next);
        })
        .catch(next)
    });
};

module.exports.updateUser = (req, res, next) => {
  let updDate = {};

  if (req.body.name) {
    updDate.name = req.body.name;
  }

  if (req.body.about) {
    updDate.about = req.body.about;
  }

  if (req.body.avatar) {
    updDate.avatar = req.body.avatar;
  }

  User.findByIdAndUpdate(
    req.user._id,
    updDate,
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new ObjectForError('ObjectNotFound'))
    .then((user) => res.json(user))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => { // All right, Hristofor Bonifat'evich !!!
      const secret = NODE_ENV === 'production' ? JWT_SECRET : 'devsecret';
      const token = jwt.sign({ _id: user._id }, secret, { expiresIn: '7d' });
      res.json({ token });
    })
    .catch(next);
}
