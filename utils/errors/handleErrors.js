import {
  NotFoundError,
  CastError,
  DuplicateKeyError,
  ValidationError,
  SyntaxError,
  MaxListsPerUserError,
} from "./errors";

const responseError = (error) =>
  Response.json(error, {
    status: error.status,
  });

export default function handleErrors(error) {
  console.log("IN");

  if (error instanceof NotFoundError) {
    return responseError(error);
  } else if (error instanceof CastError) {
    return responseError(error);
  } else if (error instanceof DuplicateKeyError) {
    return responseError(error);
  } else if (error instanceof ValidationError) {
    return responseError(error);
  } else if (error instanceof SyntaxError) {
    return responseError(error);
  } else if (error instanceof MaxListsPerUserError) {
    return responseError(error);
  } else {
    return Response.json(error, {
      status: 500,
    });
  }
}
