const { celebrate, Joi } = require('celebrate');
const { urlRegExp } = require('../validation/regexpressions');

const usersRouter = require('express').Router();
const {
  getUser,
  getUsers,
  getUserById,
  updateUser,
} = require('../controllers/users');

usersRouter.get('/me', getUser);

usersRouter.get('/', getUsers);

usersRouter.get('/:id', getUserById);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true)
}), updateUser);

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(urlRegExp),
  }).unknown(true)
}), updateUser);

module.exports = usersRouter;
