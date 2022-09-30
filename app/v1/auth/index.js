const config = require('../config/config');
const jwt = require('jsonwebtoken');
const error = require('../utils/error')

const check = {
    owner: (req, owner) => {
        const decodedUser = decodeHeader(req);
        if (decodedUser.id !== owner) {
            throw error('Unauthorized', 401);
        }
    },
    logged: (req) => {
        return decodeHeader(req);
    },
};

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decodedUser = verifyToken(token);

    req.user = decodedUser;

    return decodedUser;
}

function singToken(user) {
    return jwt.sign(user, config.jwtAccessSecret);
}

function getToken(authorization) {
    if (!authorization) {
        throw new Error('Token is required');
    }

    if (authorization.indexOf('Bearer ') === -1) {
        throw new Error('Token format invalid');
    }

    let token = authorization.replace('Bearer ', '');
    return token;
}

function verifyToken(token) {
    return jwt.verify(token, config.jwtAccessSecret);
}

module.exports = {
    singToken,
    check,
};
