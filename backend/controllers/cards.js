const Card = require('../models/card');
const { ObjectForError, sendError } = require('../validation/errors');

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.json(card))
    .catch((error) => sendError(error, res));
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail(new ObjectForError('ObjectNotFound'))
    .then((cardData) => res.json(cardData))
    .catch((error) => sendError(error, res));
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.json(cards))
    .catch((error) => sendError(error, res));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new ObjectForError('ObjectNotFound'))
    .then((card) => res.json(card))
    .catch((error) => sendError(error, res));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new ObjectForError('ObjectNotFound'))
    .then((card) => res.json(card))
    .catch((error) => sendError(error, res));
};
