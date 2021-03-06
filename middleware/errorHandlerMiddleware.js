import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err.code === 11000) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: err.message, keyValue: err.keyValue });
  }
  let statusCode;
  if (err.statusCode) {
    statusCode = err.statusCode;
  } else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = StatusCodes.BAD_REQUEST;
  } else {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
  const errorMessage = err.message || "Something went wrong";
  return res
    .status(statusCode)
    .json({ message: errorMessage, errors: err.errors });
};

export default errorHandlerMiddleware;
