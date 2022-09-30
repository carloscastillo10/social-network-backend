const auth = require('../../../auth');

function checkAuth(action) {
    function middleware(req, res, next) {
        switch (action) {
            case 'update':
                auth.check.owner(req, req.body.id);
                next();
                break;

            case 'follow':
                auth.check.logged(req);
                next();
                break;

            default:
                next();
                break;
        }
    }

    return middleware;
}

module.exports = checkAuth;
