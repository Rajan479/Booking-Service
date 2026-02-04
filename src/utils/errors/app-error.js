const AppError = function(
    name,
    message,
    explanation,
    statusCode
){
    
    const error = new Error(message);
    error.name = name;
    error.explanation = explanation;
    error.statusCode = statusCode;

    return error;
};

module.exports = AppError;