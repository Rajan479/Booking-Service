const { StatusCodes } = require('http-status-codes');

const ServiceError = function (
  message = 'Something Went Wrong',
  explanation = 'Service layer error',
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR
) {
  const error = new Error();

  error.name = 'ServiceError';
  error.message = message;
  error.explanation = explanation;
  error.statusCode = statusCode;

  return error;
};

module.exports = ServiceError;