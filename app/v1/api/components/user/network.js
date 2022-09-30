const controller = require('./index');
const express = require('express');
const response = require('../../../network/response');
const authSecure = require('./secure');

const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', authSecure('update'), upsert);

function list(req, res, next) {
    controller
        .list()
        .then((users) => {
            response.success(req, res, 200, users);
        })
        .catch(next);
}

function get(req, res, next) {
    controller
        .get(req.params.id)
        .then((user) => {
            response.success(req, res, 200, user);
        })
        .catch(next);
}

function upsert(req, res, next) {
    controller
        .upsert(req.body)
        .then((user) => {
            response.success(req, res, 201, user);
        })
        .catch(next);
}

module.exports = router;
