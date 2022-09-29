const auth = require('../../../auth');

function checkAuth(action) {
    function middleware(req, res, next) {
        switch (action) {
            case 'update':
                const owner = req.body.id;
                auth.check.owner(req, owner);
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
