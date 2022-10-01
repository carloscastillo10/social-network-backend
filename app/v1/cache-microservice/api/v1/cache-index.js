const bodyParser = require('body-parser');
const config = require('../../../config/config');
const express = require('express');
const storeRouter = require('./network');

const app = express();
app.use(bodyParser.json());

// ROUTER
app.use('/api/v1', storeRouter);

app.listen(config.cacheMicroService.port, () => {
    console.log(
        'Cache microservice listening on port ' + config.cacheMicroService.port
    );
});
