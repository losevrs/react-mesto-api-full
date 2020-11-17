const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const User = require('../models/user');

const { ObjectForError, sendError } = require('../validation/errors');

module.exports.getUser = (req, res) => {
  res.json(req.user);
}

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.json(users))
    .catch((error) => sendError(error, res));
};

module.exports.getUserById = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .orFail(new ObjectForError('ObjectNotFound'))
    .then((user) => res.json(user))
    .catch((error) => sendError(error, res));
};

module.exports.createUser = (req, res) => {
  const { email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ email, password: hash })
        .then((user) => res.json(user))
        .catch((error) => sendError(error, res))
    });
};

module.exports.updateUser = (req, res) => {
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
    .catch((error) => sendError(error, res));
};

module.exports.updateAvatar = (req, res) => {
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
    .catch((error) => sendError(error, res));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => { // All right, Hristofor Bonifat'evich !!!
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      //res.json({ token });
      res.setHeader('Set-Cookie', `token=${token}; HttpOnly`);
    })
    .catch((error) => sendError(error, res));
}
