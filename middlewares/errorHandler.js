const errorHandler = function (err, req, res, next) {
  let name = err.name;
  let code = err.code;
  let message = err.message;

  switch (name) {
    case "SequelizeValidationError":
      const errors = err.errors.map((el) => el.message);
      message = errors;
      code = 400;
      break;
    case "SequelizeUniqueConstraintError":
      message = "Username or email already registered";
      code = 422;
      break;
    case "NotFound":
      message = "Data not found";
      code = 404;
      break;
    case "InvalidToken":
      message = "Please log in first";
      code = 401;
      break;
    case "NotAuthorized":
      message = "You are not authorized";
      code = 403;
      break;
    case "JsonWebTokenError":
      message = "Invalid Token";
      code = 401;
      break;
    case "Unauthorized":
      message = "Invalid email/password";
      code = 401;
      break;

    default:
      console.log(err);
      message = "Internal Server Error";
      code = 500;
  }

  res.status(code).json({ message });
};

module.exports = errorHandler;
