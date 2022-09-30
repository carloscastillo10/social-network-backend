const auth = require('../../../../../auth');
const controller = require('./index');

function checkAuth(action, options) {
    async function middleware(req, res, next) {
        switch (action) {
            case 'add':
                break;

            case 'list_own':
                auth.check.logged(req);
                next();
                break;

            case 'update':
                auth.check.owner(req, await controller.get(req.body.id).user);
                next();
                break;

            default:
                next();
        }
    }

    return middleware;
}

module.exports = checkAuth;
