const MysqlStore = require('../../../store/mysql');
const PostController = require('./controller');

const store = new MysqlStore();
const controller = new PostController(store);

module.exports = controller;
