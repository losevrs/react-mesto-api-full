const Card = require('../models/card');
const { ObjectForError } = require('../validation/errors');

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.json(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(new ObjectForError('ObjectNotFound'))
    .then((user) => {
      if (user.owner != req.user._id) {
        next(new ObjectForError('Forbidden'))
        return;
      }
      Card.findByIdAndRemove(cardId)
        .orFail(new ObjectForError('ObjectNotFound'))
        .then((cardData) => res.json(cardData))
        .catch(next);
    })
    .catch(next);
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.json(cards))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new ObjectForError('ObjectNotFound'))
    .then((card) => res.json(card))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new ObjectForError('ObjectNotFound'))
    .then((card) => res.json(card))
    .catch(next);
};
