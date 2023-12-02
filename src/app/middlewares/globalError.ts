import { ErrorRequestHandler } from "express";
import config from "../../config";
import { IGenericErrorMessage } from "../../interface/error";
import API_Error from "../../error/apiError";
import handleCastError from "../../error/castError";
import handleValidationError from "../../error/validation";

const globalErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorMessages: IGenericErrorMessage[] = [];

  config.env == "development"
    ? console.log("globalErrorHandler --", err)
    : console.log(err);

  if (err.name == "ValidationError") {
    const validationError = handleValidationError(err);
    statusCode = validationError?.statusCode;
    message = validationError?.message;
    errorMessages = validationError.errorMessages;
    // handle api error
  } else if (err instanceof API_Error) {
    statusCode = err.statusCode;
    message = err.message;
    errorMessages = err.message ? [{ path: "", message: err?.message }] : [];
  }

  // CAST ERROR HANDEL
  else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  }

  // CUSTOM ERROR
  else if (err instanceof Error) {
    message = err.message;
    errorMessages = err?.message ? [{ path: "", message: err?.message }] : [];
  }

  //  DEFAULT ERROR
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== "production" ? err.message : undefined,
  });
};

export default globalErrorHandler;
