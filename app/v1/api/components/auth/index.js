const DummyStore = require('../../../store/dummy');
const AuthController = require('./controller');

const store = new DummyStore();
const controller = new AuthController(store);

module.exports = controller;
