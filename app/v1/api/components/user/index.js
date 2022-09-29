const DummyStore = require('../../../store/dummy');
const UserController = require('./controller');

const store = new DummyStore();
const controller = new UserController(store);

module.exports = controller;
