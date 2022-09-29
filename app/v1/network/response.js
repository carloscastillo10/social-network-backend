const statusMessages = {
    200: 'OK',
    201: 'Created',
    400: 'Invalid data',
    500: 'Internal server error',
};

function success(req, res, status, message) {
    let statusCode = status || 200;
    let statusMessage = message;
    if (!message) {
        statusMessage = statusMessages[statusCode];
    }
    res.status(statusCode).send({
        error: false,
        status: statusCode,
        data: statusMessage,
    });
}

function error(req, res, status, message) {
    let statusCode = status || 500;
    let statusMessage = message;

    if (!message) {
        statusMessage = statusMessages[statusCode];
    }
    res.status(statusCode).send({
        error: statusMessage,
        status: statusCode,
        data: false,
    });
}

module.exports = { success, error };
