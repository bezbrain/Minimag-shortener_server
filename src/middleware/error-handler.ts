import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

interface AppError extends Error {
  statusCode?: number;
  code?: number;
  keyValue?: Record<string, unknown>;
  errors?: Record<string, { message: string }>;
  value?: unknown;
}

const ErrorHandlerMiddleware: ErrorRequestHandler = (err: AppError, _req, res, _next) => {
  const customError = {
    message: err.message || "Something went wrong, please try again later!",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (err.name === "ValidationError" && err.errors) {
    const errorValue = Object.values(err.errors)
      .map((each) => each.message)
      .join(", ");
    customError.message = errorValue;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.code === 11000 && err.keyValue) {
    const errorValue = Object.keys(err.keyValue);
    customError.message = `${errorValue} already existed. Please try another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.name === "CastError") {
    const errorValue =
      err instanceof mongoose.Error.CastError ? err.value : err.value;
    customError.message = `Link with the ID, ${errorValue} not found`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  res.status(customError.statusCode).json({
    success: false,
    message: customError.message,
  });
};

export default ErrorHandlerMiddleware;
