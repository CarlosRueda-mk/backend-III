import multer from "multer";
import path from "path";
import CustomError from "../errors/custom-error.js";
import ERROR_DICTIONARY from "../errors/error-dictionary.js";
import logger from "./logger.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;

    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];

  const allowedExtensions = [".pdf", ".jpg", ".jpeg", ".png"];

  const extension = path.extname(file.originalname).toLowerCase();

  if (
    allowedTypes.includes(file.mimetype) ||
    (file.mimetype === "application/octet-stream" &&
      allowedExtensions.includes(extension))
  ) {
    cb(null, true);
  } else {
    logger.warning(`Attempt to upload unsupported file type: ${file.mimetype}`);

    cb(new CustomError(ERROR_DICTIONARY.INVALID_FILE_TYPE));
  }
};
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;
