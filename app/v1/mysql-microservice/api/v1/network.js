const express = require('express');
const response = require('../../../network/response');
const MysqlStore = require('../../../store/mysql');

const router = express.Router();
const store = new MysqlStore();

router.get('/:table', list)
router.get('/:table/:id', get)
router.post('/:table', insert)
router.put('/:table', update)

async function list(req, res, next){
    await store
        .list(req.params.table)
        .then((data) => {
            response.success(req, res, 200, data);
        })
        .catch(next);
}

async function get(req, res, next){
    await store
        .get(req.params.table, req.params.id)
        .then((data) => {
            response.success(req, res, 200, data);
        })
        .catch(next);

}

async function insert(req, res, next){
    await store
        .insert(req.params.table, req.body)
        .then((data) => {
            response.success(req, res, 200, data);
        })
        .catch(next);

}

async function update(req, res, next){
    await store
        .update(req.params.table, req.body)
        .then((data) => {
            response.success(req, res, 200, data);
        })
        .catch(next);

}

module.exports = router;
