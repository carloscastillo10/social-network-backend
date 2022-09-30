const authSecure = require('./secure');
const controller = require('./index');
const express = require('express');
const response = require('../../../../../network/response');

const router = express.Router();

router.get('/', authSecure('list'), list);
router.get('/like', authSecure('list_own'), postsLiked);
router.get('/:id', authSecure('get'), get);
router.post('/', authSecure('add',), upsert);
router.put('/', authSecure('update', { owner: 'user' }), upsert);
router.post('/:id/like', authSecure('add'), like);
router.get('/:id/like', authSecure('list'), postLikers);

function list(req, res, next) {
    controller
        .list()
        .then((posts) => {
            response.success(req, res, 200, posts);
        })
        .catch(next);
}

function get(req, res, next) {
    controller
        .get(req.params.id)
        .then((post) => {
            response.success(req, res, 200, post);
        })
        .catch(next);
}

function upsert(req, res, next) {
	controller.upsert(req.body, req.user.id)
		.then((post) => {
			response.success(req, res, 201, post);
		})
		.catch(next);
}

function like(req, res, next) {
	controller.like(req.params.id, req.user.sub)
		.then((post) => {
			response.success(req, res, 201, post);
		})
		.catch(next);
}

function postLikers(req, res, next) {
	controller.postLikers(req.params.id)
		.then((post) => {
			response.success(req, res, 200, post);
		})
		.catch(next);
}

function postsLiked(req, res, next) {
	controller.postsLiked(req.user.sub)
		.then((post) => {
			response.success(req, res, 200, post);
		})
		.catch(next);
}

module.exports = router;
