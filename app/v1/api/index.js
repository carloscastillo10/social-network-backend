const bodyParser = require('body-parser');
const config = require('../config/config');
const express = require('express');
const userRouter = require('./components/user/network');
const authRouter = require('./components/auth/network')

const app = express();
app.use(bodyParser.json());

// ROUTER
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);

app.listen(config.port, () => {
    console.log('listening on port ' + config.port);
});
