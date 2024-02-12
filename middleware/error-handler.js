const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong, please try again later!",
  };

  res.status(customError.statusCode).json({
    success: false,
    message: customError.message,
  });
};

module.exports = errorHandlerMiddleware;
