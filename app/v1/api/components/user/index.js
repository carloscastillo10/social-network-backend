// const MysqlStore = require('../../../store/mysql');
const UserController = require('./controller');
const RedisStore = require('../../../store/redis');
const store = require('../../../store/remote-mysql');

// const store = new MysqlStore();
const cache = new RedisStore();
const controller = new UserController(store, cache);

module.exports = controller;
