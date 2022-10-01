const RemoteDatabase = require('./remote');
const config = require('../config/config');

module.exports = new RemoteDatabase(
    config.cacheMicroService.host,
    config.cacheMicroService.port
);
