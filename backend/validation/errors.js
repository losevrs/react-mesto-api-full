const INCORRECT_DATA_ERROR = {
  code: 400,
  message: 'Переданы некорректные данные.',
};

const NOT_FOUND_ERROR = {
  code: 404,
  message: 'Обьект не найден.',
};

const SERVER_ERROR = {
  code: 500,
  message: 'Внутренняя ошибка сервера.',
};

function sendError(error, res) {
  let errorCode = SERVER_ERROR.code;
  let errorMessage = SERVER_ERROR.message;

  switch (error.name) {
    case 'CastError':
    case 'ValidationError':
      errorCode = INCORRECT_DATA_ERROR.code;
      errorMessage = INCORRECT_DATA_ERROR.message;
      break;
    case 'ObjectNotFound':
      errorCode = NOT_FOUND_ERROR.code;
      errorMessage = NOT_FOUND_ERROR.message;
      break;
    default:
      break;
  }

  res.status(errorCode).send({ message: errorMessage });
}

class ObjectForError extends Error {
  constructor(name, message = '') {
    super(message);
    this.name = name;
  }
}

module.exports = {
  INCORRECT_DATA_ERROR,
  NOT_FOUND_ERROR,
  SERVER_ERROR,
  ObjectForError,
  sendError,
};
