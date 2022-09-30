const auth = require('../auth');
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
        };

        await auth.upsert({
            id: user.id,
            username: user.username,
            password: body.password,
        });

        return this.store.upsert(table, user);
    }

    follow(from, to) {
        if (from === to){
            return Promise.reject('Invalid data');
        }

        return this.store.insert(`${table}_follow`, {
            user_from: from,
            user_to: to,
        });
    }

    async following(user) {
        const join = {}
        join[table] = 'user_to';
        const query = { user_from: user };

		return await this.store.query(`${table}_follow`, query, join);
	}
}

module.exports = UserController;
