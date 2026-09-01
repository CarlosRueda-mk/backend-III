import multer from "multer";
import CustomError from "../errors/custom-error.js";
import ERROR_DICTIONARY from "../errors/error-dictionary.js";

const uploadErrorMiddleware = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return next(new CustomError(ERROR_DICTIONARY.FILE_TOO_LARGE));
    }
  }

  next(error);
};

export default uploadErrorMiddleware;
