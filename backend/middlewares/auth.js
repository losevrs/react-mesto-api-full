const jwt = require('jsonwebtoken');

require('dotenv').config();
const { NODE_ENV, JWT_SECRET } = process.env;

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
    const secret = NODE_ENV === 'production' ? JWT_SECRET : 'devsecret';
    payload = jwt.verify(token, secret);
  } catch (err) {
    next(new ObjectForError('NotAutorisation'));
    return;
  }

  req.user = payload;
  next();
};
