const usersRouter = require('express').Router();
const {
  getUser,
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);

usersRouter.get('/', getUsers);

usersRouter.get('/:id', getUserById);

usersRouter.patch('/me', updateUser);

usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
