const config = require('../config/config');
const express = require('express');

const app = express();

// ROUTER

app.listen(config.port, () => {
    console.log('listening on port ' + config.port);
});
