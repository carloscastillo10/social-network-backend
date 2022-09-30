const bodyParser = require('body-parser');
const config = require('../../../config/config');
const errorHandler = require('../../../network/errors');
const express = require('express');
const postRouter = require('./components/post/network');

const app = express();
app.use(bodyParser.json());

// ROUTER
app.use('/api/v1/posts', postRouter);

// MIDDLEWARES
app.use(errorHandler);

app.listen(config.postMicroservice.port, () => {
    console.log('Post microservice listening on port ' + config.postMicroservice.port);
});
