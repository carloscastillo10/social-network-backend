const jwt = require('jsonwebtoken');

function singToken(user) {
    return jwt.sign(user, 'secreto')
}

module.exports = {
    singToken
}
