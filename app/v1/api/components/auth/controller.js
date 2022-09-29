const table = 'auth';
const auth = require('../../../auth')

class AuthController {
    constructor(injectedStore) {
        this.store = injectedStore;
        if (!this.store) {
            const DummyStore = require('../../../store/dummy');
            this.store = new DummyStore();
        }
    }

    async login(username, password) {
        let dataQuery = { username: username };
        const user = await this.store.query(table, dataQuery);

        if (!user) {
            throw new Error('User not found');
        }

        if (user.password !== password) {
            throw new Error('Invalid data');
        }

        return auth.singToken(user);
    }

    upsert(data) {
        const authData = {
            id: data.id,
        };

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            authData.password = data.password;
        }

        return this.store.upsert(table, authData);
    }
}

module.exports = AuthController;
