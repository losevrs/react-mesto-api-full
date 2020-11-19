const jwt = require('jsonwebtoken');

require('dotenv').config();
const { JWT_SECRET } = process.env;

const { ObjectForError } = require('../validation/errors');

module.exports = (req, res, next) => {

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new ObjectForError('NotAutorisation'));
    return;
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new ObjectForError('NotAutorisation'));
    return;
  }

  req.user = payload;
  next();
};
