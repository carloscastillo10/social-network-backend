const request = require('request');

class RemoteDatabase {
    constructor(host, port) {
        this.url = `http://${host}:${port}`;
    }

    list(table) {
        return this.req('GET', table);
    }

    // function get(table, ud){
    //     //
    // }

    // function insert(table, data){
    //     //
    // }

    // function update(table, data){
    //     //
    // }

    // function query(table, dataQuery, join){
    //     //
    // }

    req(method, table, data) {
        let url = `${this.url}/api/v1/${table}`;
        let body = '';

        return new Promise((resolve, reject) => {
            request(
                {
                    method,
                    headers: {
                        'content-type': 'application/json',
                    },
                    url,
                    body,
                },
                (error, req, body) => {
                    if (error) {
                        return reject(error.message);
                    }

                    const res = JSON.parse(body);
                    resolve(res.data);
                }
            );
        });
    }
}

module.exports = RemoteDatabase;
