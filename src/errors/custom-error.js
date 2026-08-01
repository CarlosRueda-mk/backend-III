class CustomError extends Error {
  constructor({ message, status, code, cause = null }) {
    super(message);

    this.name = "CustomError";
    this.status = status;
    this.code = code;
    this.cause = cause;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
