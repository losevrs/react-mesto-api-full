const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');

const { urlRegExp } = require('../validation/regexpressions');
const { ObjectForError } = require('../validation/errors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(ava) {
        return urlRegExp.test(ava);
      },
      message: 'Необходимо ввести ссылку на аватар в формате url!',
    },
  },
  email: {
    type: String,
    required: [true, 'Поле обязательно для заполнения.'],
    unique: [true, 'Поле не уникально.'],
    validate: {
      validator(mail) {
        return isEmail(mail);
      },
      message: 'Необходимо ввести электронную почту!',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле обязательно для заполнения.'],
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(new ObjectForError('LoginFailed'))
    .then((user) => {
      return bcrypt.compare(password, user.password)
        .then((match) => {
          if (!match) {
            return Promise.reject(new ObjectForError('LoginFailed'));
          }
          return user;
        })
    });
};

module.exports = mongoose.model('user', userSchema);
