const config = require('../config/config');
const redis = require('redis');

class RedisStore {
    constructor() {
        this.client = redis.createClient({
            url: config.cacheMicroService.redis.dbUrl,
        });
        (async () => {
            await this.client.connect();
        })();
    }

    async list(table) {
        const data = await this.client.get(table);
        return JSON.parse(data);
    }

    async get(table, id) {
        const data = await this.client.get(`${table}_${id}`);
        return JSON.parse(data);
    }

    async upsert(table, data) {
        let key = table;
        if (data && data.id) {
            key += '_' + data.id;
        }
        await this.client.setEx(key, 10, JSON.stringify(data));
        return true;
    }
}

module.exports = RedisStore;
