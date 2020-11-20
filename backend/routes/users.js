const { celebrate, Joi } = require('celebrate');
const { urlRegExp } = require('../validation/regexpressions');

const usersRouter = require('express').Router();
const {
  getUser,
  updateUser,
} = require('../controllers/users');

usersRouter.get('/me', getUser);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(40),
    about: Joi.string().min(2).max(200),
  }).unknown(true)
}), updateUser);

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(urlRegExp),
  }).unknown(true)
}), updateUser);

module.exports = usersRouter;
