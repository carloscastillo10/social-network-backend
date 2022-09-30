const table = 'post';

class PostController {
    constructor(injectedStore) {
        this.store = injectedStore;
        if (!this.store) {
            const DummyStore = require('../../../../../store/dummy');
            this.store = new DummyStore();
        }
    }

    list() {
        return this.store.list(table);
    }
}

module.exports = PostController;
