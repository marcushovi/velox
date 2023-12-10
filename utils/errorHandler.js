const CastError = (error) => ({
  message: error.message || "Invalid cast operation",
  statusCode: 400,
  name: error.name,
  parameters: {
    value: error.value,
  },
});

const DuplicateKeyError = (error) => ({
  message: "Duplicate key error",
  statusCode: 409,
  name: "DuplicateKeyError",
  parameters: { ...error.keyValue },
});

const ValidationError = (error) => ({
  message: error.message || "Validation failed",
  statusCode: 400,
  name: error.name,
  parameters: error.errors,
});

const NotFoundError = (error) => ({
  message: error.message || "Not found",
  statusCode: 404,
  name: error.name,
  parameters: { ...error.value },
});

const SyntaxError = (error) => ({
  message: error.message || "Unsupported Media Type",
  statusCode: 415,
  name: error.name,
});

const MaxListsPerUserError = (error) => ({
  message: error.message || "Max. Lists Per User Error",
  statusCode: 400,
  name: error.cause,
});

const responseError = (error) =>
  Response.json(error, {
    status: error.statusCode,
  });

const ErrorHandler = {
  handleCustomError: (error) => {
    let customError;

    if (error.name === "CastError") {
      customError = CastError(error);
    } else if (error.code === 11000 || error.name === "DuplicateKeyError") {
      customError = DuplicateKeyError(error);
    } else if (error.name === "ValidationError") {
      customError = ValidationError(error);
    } else if (error.name === "NotFound") {
      customError = NotFoundError(error);
    } else if (error.name === "SyntaxError") {
      customError = SyntaxError(error);
    }else if (error.cause === "MaxListsPerUserError") {
      customError = MaxListsPerUserError(error);
    } else {
      // Default error handling
      customError = {
        message:
          error.message || "Internal Server Error, please try again later.",
        statusCode: 500,
        name: error.name || "InternalServerError",
        error: error|| "-",
      };
    }

    return responseError(customError);
  },
};

module.exports = ErrorHandler;
