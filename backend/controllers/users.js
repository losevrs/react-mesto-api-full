const User = require('../models/user');
const { ObjectForError, sendError } = require('../validation/errors');

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
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.json(user))
    .catch((error) => sendError(error, res));
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
