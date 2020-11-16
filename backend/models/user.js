const mongoose = require('mongoose');
const { urlRegExp } = require('../validation/regexpressions');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Имя пользователя обязательно для заполнения.'],
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: [true, 'Описание обязательно для заполнения.'],
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(ava) {
        return urlRegExp.test(ava);
      },
      message: 'Необходимо ввести ссылку на аватар в формате url!',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
