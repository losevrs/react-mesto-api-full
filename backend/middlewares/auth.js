const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { ObjectForError } = require('../validation/errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  //NotAutorisaton
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new ObjectForError('NotAutorisaton'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new ObjectForError('NotAutorisaton'));
  }

  req.user = payload;
  next();
};
