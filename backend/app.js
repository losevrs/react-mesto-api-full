const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const timeLog = (req, res, next) => {
  const now = new Date();
  console.log(now, req.method, req.url);
  next();
};

app.use(timeLog);

app.use((req, res, next) => {
  req.user = {
    _id: '5f97de2b0a666924a0bbba45',
  };
  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.listen(PORT, () => {
  console.log('Listen on port -> ', PORT);
});
