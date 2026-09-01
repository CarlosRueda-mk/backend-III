import ERROR_CODES from "./error-codes.js";

const ERROR_DICTIONARY = Object.freeze({
  USER_NOT_FOUND: {
    code: ERROR_CODES.NOT_FOUND,
    status: 404,
    message: "User not found",
  },

  PRODUCT_NOT_FOUND: {
    code: ERROR_CODES.NOT_FOUND,
    status: 404,
    message: "Product not found",
  },

  ORDER_NOT_FOUND: {
    code: ERROR_CODES.NOT_FOUND,
    status: 404,
    message: "Order not found",
  },

  DELIVERY_NOT_FOUND: {
    code: ERROR_CODES.NOT_FOUND,
    status: 404,
    message: "Delivery not found",
  },

  ROUTE_NOT_FOUND: {
    code: ERROR_CODES.NOT_FOUND,
    status: 404,
    message: "Route not found",
  },

  EMAIL_ALREADY_EXISTS: {
    code: ERROR_CODES.DUPLICATE_RESOURCE,
    status: 409,
    message: "This email is already used",
  },

  PRODUCT_ALREADY_EXISTS: {
    code: ERROR_CODES.DUPLICATE_RESOURCE,
    status: 409,
    message: "Product already exists",
  },

  INVALID_QUANTITY: {
    code: ERROR_CODES.VALIDATION_ERROR,
    status: 400,
    message: "Quantity must be between 1 and 100",
  },

  INTERNAL_SERVER_ERROR: {
    code: ERROR_CODES.INTERNAL_SERVER_ERROR,
    status: 500,
    message: "Internal server error",
  },

  FILE_REQUIRED: {
    code: ERROR_CODES.VALIDATION_ERROR,
    status: 400,
    message: "File is required",
  },

  INVALID_FILE_TYPE: {
    code: ERROR_CODES.VALIDATION_ERROR,
    status: 400,
    message: "Invalid file type",
  },

  FILE_TOO_LARGE: {
    code: ERROR_CODES.VALIDATION_ERROR,
    status: 400,
    message: "File size exceeds the maximum allowed",
  },

  INVALID_DOCUMENT_TYPE: {
    code: ERROR_CODES.VALIDATION_ERROR,
    status: 400,
    message: "Invalid document type",
  },

  FILE_SAVE_ERROR: {
    code: ERROR_CODES.INTERNAL_SERVER_ERROR,
    status: 500,
    message: "Error saving file",
  },
});

export default ERROR_DICTIONARY;
