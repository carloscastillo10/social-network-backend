const table = 'user';
const uuid = require('uuid');

class UserController {
    constructor(injectedStore) {
        this.store = injectedStore;
        if (!this.store) {
            const DummyStore = require('../../../store/dummy');
            this.store = new DummyStore();
        }
    }

    list() {
        return this.store.list(table);
    }

    get(id) {
        return this.store.get(table, id);
    }

    upsert(body) {
        let userId = body.id;

        if (!body.name) {
            return Promise.reject('Invalid data');
        }
        if (!userId) {
            userId = uuid.v1();
        }
        const user = {
            id: userId,
            name: body.name,
        };

        return this.store.upsert(table, user);
    }
}

module.exports = UserController;
