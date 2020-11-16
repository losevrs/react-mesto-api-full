const mongoose = require('mongoose');
const { urlRegExp } = require('../validation/regexpressions');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Наименование карточки обязательно для заполнения.'],
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(ava) {
        return urlRegExp.test(ava);
      },
      message: 'Необходимо ввести ссылку на фото в формате url!',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: 'user',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
