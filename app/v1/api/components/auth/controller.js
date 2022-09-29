const auth = require('../../../auth');
const bcrypt = require('bcrypt');
const table = 'auth';

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
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error('Invalid data');
        }

        return auth.singToken(user);
    }

    async upsert(data) {
        const authData = {
            id: data.id,
        };

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            authData.password = await bcrypt.hash(data.password, 10);
        }

        return this.store.upsert(table, authData);
    }
}

module.exports = AuthController;
