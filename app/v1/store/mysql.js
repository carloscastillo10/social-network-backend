const mysql = require('mysql');
const config = require('../config/config');

class MysqlStore {
    constructor() {
        this.connection = mysql.createConnection(config.mysql);
        this.connection.connect((error) => {
            if (error) {
                console.log('[db connection error]', error);
                setTimeout(new MysqlStore(), 2000);
            }
        });

        this.connection.on('error', (error) => {
            console.log('[db connection error]', error);
            if (error.code === 'PROTOCOL_CONNECTION_LOST') {
                new MysqlStore();
            } else {
                throw error;
            }
        });
    }

    list(table) {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM ${table}`, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });
    }

    get(table, id) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                `SELECT * FROM ${table} WHERE id='${id}'`,
                (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                }
            );
        });
    }

    async upsert(table, data) {
        const isRegistered = await this.get(table, data.id);
        if (isRegistered.length !== 0) {
            return this.update(table, data);
        }

        return this.insert(table, data);
    }

    insert(table, data) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                `INSERT INTO ${table} SET ?`,
                data,
                (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                }
            );
        });
    }

    update(table, data) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                `UPDATE ${table} SET ? WHERE id=?`,
                [data, data.id],
                (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                }
            );
        });
    }

    query(table, dataQuery, join) {
        let joinQuery = '';
        if (join) {
            const key = Object.keys(join)[0];
            const val = join[key];
            joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
        }

        return new Promise((resolve, reject) => {
            this.connection.query(
                `SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`,
                dataQuery,
                (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result[0] || null);
                }
            );
        });
    }
}

module.exports = MysqlStore;
