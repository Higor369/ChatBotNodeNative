const MongoClient = require('mongodb').MongoClient;
const config = require('../config');
const assert = require('assert');
const { promises } = require('dns');
const { rejects } = require('assert');
const url = config.mongoDbUrl;


class MongoDbConnection {

    db;
    
    constructor(){ 

    }
    getConnection() {
        return new Promise(function(resolve,reject){
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
                assert.equal(null, err);

                if(err){
                    reject(err);
                }
                console.log('banco de dados conectado com sucesso. dbName = ');
                resolve(client.db('local'))
                
        })
        });
    }
}

module.exports = MongoDbConnection;