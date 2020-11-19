const { celebrate, Joi } = require('celebrate');
const { urlRegExp } = require('../validation/regexpressions');

const cardsRouter = require('express').Router();
const {
  createCard,
  deleteCard,
  getCards,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);

cardsRouter.delete('/:cardId', deleteCard);

cardsRouter.delete('/:cardId/likes', dislikeCard);
cardsRouter.put('/:cardId/likes', likeCard);

cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(urlRegExp).required(),
  }).unknown(true)
}), createCard);

module.exports = cardsRouter;
