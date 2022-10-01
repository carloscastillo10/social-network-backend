const express = require('express');
const response = require('../../../network/response');
const RedisStore = require('../../../store/redis');

const router = express.Router();
const store = new RedisStore();

router.get('/:table', list);
router.get('/:table/:id', get);
router.put('/:table', upsert);

async function list(req, res, next) {
    await store
        .list(req.params.table)
        .then((data) => {
            response.success(req, res, 200, data);
        })
        .catch(next);
}

async function get(req, res, next) {
    await store
        .get(req.params.table, req.params.id)
        .then((data) => {
            response.success(req, res, 200, data);
        })
        .catch(next);
}

async function upsert(req, res, next) {
    await store
        .upsert(req.params.table, req.body)
        .then((data) => {
            response.success(req, res, 200, data);
        })
        .catch(next);
}

module.exports = router;
