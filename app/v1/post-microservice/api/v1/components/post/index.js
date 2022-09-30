const PostController = require('./controller');
const store = require('../../../../../store/remote-mysql');

const controller = new PostController(store);

module.exports = controller;
