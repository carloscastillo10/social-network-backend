const auth = require('../auth')
const uuid = require('uuid');
const table = 'user';

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

    async upsert(body) {
        let userId = body.id;

        if (!body.name || !body.lastname || !body.username || !body.password) {
            return Promise.reject('Invalid data');
        }
        if (!userId) {
            userId = uuid.v1();
        }
        const user = {
            id: userId,
            name: body.name,
            lastname: body.lastname,
            username: body.username,
            password: body.password
        };

        await auth.upsert({
            id: user.id,
            username: user.username,
            password: user.password
        })

        return this.store.upsert(table, user);
    }
}

module.exports = UserController;
