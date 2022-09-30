const MysqlStore = require('../../../store/mysql');
const UserController = require('./controller');

const store = new MysqlStore();
const controller = new UserController(store);

module.exports = controller;
