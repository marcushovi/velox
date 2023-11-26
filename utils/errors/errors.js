import ApiError from "./ApiError";

class NotFoundError extends ApiError {
  constructor(message = "Resource Not Found", attributes) {
    super(404, message, attributes);
    this.name = "NotFoundError";
  }
}

class CastError extends ApiError {
  constructor(message = "Invalid Cast Operation", attributes) {
    super(400, message, attributes);
    this.name = "CastError";
  }
}

class DuplicateKeyError extends ApiError {
  constructor(message = "Duplicate key error", attributes) {
    super(409, message, attributes);
    this.name = "DuplicateKeyError";
  }
}

class ValidationError extends ApiError {
  constructor(message = "Validation Failed", attributes) {
    super(400, message, attributes);
    this.name = "ValidationError";
  }
}

class SyntaxError extends ApiError {
  constructor(message = "Unsupported Media Type", attributes) {
    super(415, message, attributes);
    this.name = "SyntaxError";
  }
}

class MaxListsPerUserError extends ApiError {
  constructor(message = "Max. Lists Per User Error", attributes) {
    super(400, message, attributes);
    this.name = "MaxListsPerUserError";
  }
}

module.exports = {
  NotFoundError,
  CastError,
  DuplicateKeyError,
  ValidationError,
  SyntaxError,
  MaxListsPerUserError,
};
