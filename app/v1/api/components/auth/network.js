const controller = require('./index');
const express = require('express');
const response = require('../../../network/response');

const router = express.Router();

router.post('/login', (req, res) => {
    controller
        .login(req.body.username, req.body.password)
        .then((token) => {
            response.success(req, res, 200, token);
        })
        .catch((error) => {
            response.error(req, res, 400, error.message);
        });
});

module.exports = router;
