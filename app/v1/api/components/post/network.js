const controller = require('./index');
const express = require('express');
const response = require('../../../network/response');

const router = express.Router();

router.get('/', list);

function list(req, res, next) {
    controller
        .list()
        .then((posts) => {
            response.success(req, res, 200, posts);
        })
        .catch(next);
}

module.exports = router;
