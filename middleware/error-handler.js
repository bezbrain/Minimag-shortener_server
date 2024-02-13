const { StatusCodes } = require("http-status-codes");

const ErrorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    message: err.message || "Something went wrong, please try again later!",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  // Handle validation error
  if (err.name === "ValidationError") {
    const errorValue = Object.values(err.errors)
      .map((each) => each.message)
      .join(", ");
    customError.message = errorValue;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Handle Details uniqueness error
  if (err.code === 11000) {
    const errorValue = Object.keys(err.keyValue);
    customError.message = `${errorValue} already existed. Please try another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // res.status(customError.statusCode).json({
  //   success: false,
  //   message: err,
  // });
  res.status(customError.statusCode).json({
    success: false,
    message: customError.message,
  });
};

module.exports = ErrorHandlerMiddleware;
