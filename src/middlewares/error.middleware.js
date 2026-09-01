import CustomError from "../errors/custom-error.js";
import ERROR_DICTIONARY from "../errors/error-dictionary.js";
import logger from "../config/logger.js";

const errorMiddleware = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      error: {
        code: ERROR_DICTIONARY.INVALID_QUANTITY.code,
        message: error.message,
      },
    });
  }
  if (error instanceof CustomError) {
    logger.warning(error.message);
    return res.status(error.status).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        cause: error.cause,
      },
    });
  }
  logger.error(error.stack || error.message);
  return res.status(ERROR_DICTIONARY.INTERNAL_SERVER_ERROR.status).json({
    success: false,
    error: {
      code: ERROR_DICTIONARY.INTERNAL_SERVER_ERROR.code,
      message: ERROR_DICTIONARY.INTERNAL_SERVER_ERROR.message,
    },
  });
};

export default errorMiddleware;
