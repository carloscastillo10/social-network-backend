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
        return await database[table];
    }

    async get(table, id) {
        let collection = await this.list(table);
        return collection.filter((item) => item.id === id)[0] || null;
    }

    async upsert(table, data) {
        return database[table].push(data);
    }

    async remove(table, id) {
        return true;
    }
}

module.exports = DummyStore;
