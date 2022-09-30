const bodyParser = require('body-parser');
const config = require('../../../config/config');
const express = require('express');
const storeRouter = require('./network');

const app = express();
app.use(bodyParser.json());

// ROUTER
app.use('/api/v1', storeRouter);

app.listen(config.mysqlMicroService.port, () => {
    console.log(
        'Mysql microservice listening on port ' + config.mysqlMicroService.port
    );
});
