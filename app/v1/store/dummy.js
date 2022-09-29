const database = {
    user: [
        {
            id: '1',
            name: 'Carlos',
        },
    ],
};

class DummyStore {
    async list(table) {
        return await database[table] || [];
    }

    async get(table, id) {
        let collection = await this.list(table);
        return collection.filter((item) => item.id === id)[0] || null;
    }

    async upsert(table, data) {
        if (!database[table]) {
            database[table] = [];
        }

        database[table].push(data);

    }

    async remove(table, id) {
        return true;
    }

    async query(table, dataQuery){
        let collection = await this.list(table);
        let keys = Object.keys(dataQuery)
        let key = keys[0]
        return collection.filter((item) => item[key] === dataQuery[key])[0] || null;
    }
}

module.exports = DummyStore;
