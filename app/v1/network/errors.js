const response = require('./response');

function errorHandler(error, req, res, next) {
    // console.error('[error]' + error);

    const message = error.message;
    const status = error.statusCode;

    response.error(req, res, status, message);
}

module.exports = errorHandler;
