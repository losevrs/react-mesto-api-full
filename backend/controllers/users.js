const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const User = require('../models/user');

const { ObjectForError } = require('../validation/errors');

module.exports.getUser = (req, res) => {
  res.json(req.user);
}

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.json(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .orFail(new ObjectForError('ObjectNotFound'))
    .then((user) => res.json(user))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ email, password: hash })
        .then((user) => res.json(user))
        .catch(next)
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new ObjectForError('ObjectNotFound'))
    .then((user) => res.json(user))
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
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
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      //res.json({ token });
      res.setHeader('Set-Cookie', `token=${token}; HttpOnly`);
      res.send('Set Cookie');
    })
    .catch(next);
}
