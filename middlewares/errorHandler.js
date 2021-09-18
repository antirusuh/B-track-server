const errorHandler = function (err, req, res, next) {
  let name = err.name;
  let code = err.code;
  let message = [];

  switch (name) {
    case "SequelizeValidationError":
      err.errors.map((el) => message.push(el.message));
      code = 400;
      break;
    case "SequelizeUniqueConstraintError":
      err.errors.map((el) => message.push(el.message));
      code = 422;
      break;
    case "NotFound":
      message.push(err.message)
      code = 404;
      break;
    case "InvalidToken":
      message.push(err.message)
      code = 401;
      break;
    case "NotAuthorized":
      message.push(err.message)
      code = 403;
      break;
    case "Incorrect":
      message.push(err.message)
      code = 400;
      break;
    case "Unauthorized":
      message.push(err.message)
      code = 401;
      break;
    default:
      message.push(err.message)
      code = 500;
  }

  res.status(code).json({ message });
};

module.exports = errorHandler;
