class ApiError extends Error {
  constructor(status, message, customAttributes = {}, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }

    this.name = "ApiError";
    this.status = status;
    this.message = message;
    this.customAttributes = customAttributes;
  }
}

export default ApiError;
