const MongoClient = require('mongodb').MongoClient;
const config = require('../config');
const assert = require('assert')
const url = config.mongoDbUrl;
const dbName = config.mongoDbName;

class MongoDbConnection {
    getConnection() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
                assert.equal(null, err);
                console.log('banco de dados conectado com sucesso.');
                resolve(client.db(dbName));
            });
        });
    }
}

module.exports = new MongoDbConnection();