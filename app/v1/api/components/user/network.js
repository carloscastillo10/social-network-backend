const controller = require('./index');
const express = require('express');
const response = require('../../../network/response');
const authSecure = require('./secure');

const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.get('/:id/following', following);
router.post('/', upsert);
router.post('/follow/:id', authSecure('follow'), follow);
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

function follow(req, res, next) {
    controller
        .follow(req.user.id, req.params.id)
        .then((data) => {
            response.success(req, res, 201, data);
        })
        .catch(next);
}

function following(req, res, next) {
	controller.following(req.params.id)
		.then( (data) => {
			return response.success(req, res, 200, data);
		})
		.catch(next);
}

module.exports = router;
