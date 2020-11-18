const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');

const { celebrate, Joi, errors } = require('celebrate');
const { srvLog, errorLog } = require('./middlewares/logger');
require('dotenv').config();

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { sendError } = require('./validation/errors');

const { PORT = 3000 } = process.env;

const app = express();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(srvLog); // Логирование запросов к серверу

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  })
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  }) // .unknown(true) - разрешить поля не перечисленные в валидации
}), login);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errorLog); // Логирование ошибок

app.use(errors()); // Валидация

app.use((error, req, res, next) => {
  sendError(error, res);
});

app.listen(PORT, () => {
  console.log('Listen on port -> ', PORT);
});
