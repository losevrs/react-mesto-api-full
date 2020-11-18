const path = require('path');
const winston = require('winston');
const expressWinston = require('express-winston');

module.exports.srvLog = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '..', 'logs', 'server.log').normalize()
    }),
  ],
  format: winston.format.json(),
});

module.exports.errorLog = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '..', 'logs', 'server-error.log').normalize()
    }),
  ],
  format: winston.format.json(),
});