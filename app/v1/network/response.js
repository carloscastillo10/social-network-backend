const statusMessages = {
    200: 'OK',
    201: 'Created',
    400: 'Invalid data',
    500: 'Internal error',
};

function success(req, res, message, status) {
    let statusCode = status;
    let statusMessage = message;
    if (!status) {
        statusCode = 200;
    }
    if (!message) {
        statusMessage = statusMessages[statusCode];
    }
    res.status(statusCode).send({
        error: '',
        body: statusMessage,
    });
}

function error(req, res, message, status) {
    let statusCode = status;
    let statusMessage = message;
    if (!status) {
        statusCode = 500;
    }
    if (!message) {
        statusMessage = statusMessages[statusCode];
    }
    res.status(statusCode).send({
        error: statusMessage,
        body: '',
    });
}

module.exports = { success, error };
