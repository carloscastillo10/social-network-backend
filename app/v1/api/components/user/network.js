const controller = require('./index');
const express = require('express');
const response = require('../../../network/response');
const authSecure = require('./secure')

const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', authSecure('update'), upsert);

function list(req, res) {
    controller
        .list()
        .then((users) => {
            response.success(req, res, 200, users);
        })
        .catch((error) => {
            response.error(req, res, 500, error.message);
        });
}

function get(req, res) {
    controller
        .get(req.params.id)
        .then((user) => {
            response.success(req, res, 200, user);
        })
        .catch((error) => {
            response.error(req, res, 500, error.message);
        });
}

function upsert(req, res) {
    controller
        .upsert(req.body)
        .then((user) => {
            response.success(req, res, 201, user);
        })
        .catch((error) => {
            response.error(req, res, 500, error.message);
        });
}

module.exports = router;
