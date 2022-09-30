const authRouter = require('./components/auth/network');
const bodyParser = require('body-parser');
const config = require('../config/config');
const errorHandler = require('../network/errors');
const express = require('express');
const userRouter = require('./components/user/network');

const app = express();
app.use(bodyParser.json());

// ROUTER
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);

// MIDDLEWARES
app.use(errorHandler);

app.listen(config.port, () => {
    console.log('listening on port ' + config.port);
});
