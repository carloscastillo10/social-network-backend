const RemoteDatabase = require('./remote');
const config = require('../config/config');

module.exports = new RemoteDatabase(
    config.mysqlMicroService.host,
    config.mysqlMicroService.port
);
