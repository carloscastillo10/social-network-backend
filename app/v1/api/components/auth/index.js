const MysqlStore = require('../../../store/mysql');
const AuthController = require('./controller');

const store = new MysqlStore();
const controller = new AuthController(store);

module.exports = controller;
