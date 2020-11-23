const INCORRECT_DATA_ERROR = {
  code: 400,
  message: 'Переданы некорректные данные.',
};

const LOGIN_FAILED = {
  code: 401,
  message: 'Не верное имя пользователя или пароль.',
};

const NOT_AUTORISATION = {
  code: 401,
  message: 'Отсутствует авторизация.',
};

const NOT_FOUND_ERROR = {
  code: 404,
  message: 'Обьект не найден.',
};

const FORBIDDEN_ERROR = {
  code: 403,
  message: 'Недостаточно прав.',
};

const CONFLICT_ERROR = {
  code: 409,
  message: 'Конфликт данных.',
};

const SERVER_ERROR = {
  code: 500,
  message: 'Внутренняя ошибка сервера.',
};

const INCORRECT_DBDATA_ERROR = {
  code: 500,
  message: 'Внутренняя ошибка базы.'
};

function sendError(error, res) {
  let errorCode = SERVER_ERROR.code;
  let errorMessage = SERVER_ERROR.message;

  switch (error.name) {
    case 'Forbidden':
      errorCode = FORBIDDEN_ERROR.code;
      errorMessage = FORBIDDEN_ERROR.message;
      break;
    case 'MongoError':
      errorCode = INCORRECT_DBDATA_ERROR.code;
      errorMessage = INCORRECT_DBDATA_ERROR.message;
      if (error.code === 11000) {
        errorCode = CONFLICT_ERROR.code;
        errorMessage = CONFLICT_ERROR.message;
      }
      break;
    case 'NotAutorisation':
      errorCode = NOT_AUTORISATION.code;
      errorMessage = NOT_AUTORISATION.message;
      break;
    case 'CastError':
    case 'ValidationError':
      errorCode = INCORRECT_DATA_ERROR.code;
      errorMessage = INCORRECT_DATA_ERROR.message;
      break;
    case 'ObjectNotFound':
      errorCode = NOT_FOUND_ERROR.code;
      errorMessage = NOT_FOUND_ERROR.message;
      break;
    case 'LoginFailed':
      errorCode = LOGIN_FAILED.code;
      errorMessage = LOGIN_FAILED.message;
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
