import CustomError from "../errors/custom-error.js";
import ERROR_DICTIONARY from "../errors/error-dictionary.js";

const errorMiddleware = (error, req, res, next) => {
  if (error instanceof CustomError) {
    return res.status(error.status).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        cause: error.cause,
      },
    });
  }

  return res.status(ERROR_DICTIONARY.INTERNAL_SERVER_ERROR.status).json({
    success: false,
    error: {
      code: ERROR_DICTIONARY.INTERNAL_SERVER_ERROR.code,
      message: ERROR_DICTIONARY.INTERNAL_SERVER_ERROR.message,
    },
  });
};

export default errorMiddleware;
