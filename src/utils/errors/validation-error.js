const { StatusCodes } = require("http-status-codes");

const ValidationError = function(error){
    const explanation = [];
    error.errors.forEach((err) => {
            explanation.push(err.message);
    });

    const err = new Error('Not able to validate the data sent in the request');

    err.name = 'ValidationError';
    err.explanation = explanation;
    err.statusCode = StatusCodes.BAD_REQUEST;

    return err;
}

module.exports = ValidationError;