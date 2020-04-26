const assert = require('assert');

const mongoDb = require('../../infra/mongo');

class documentsService {

    constructor(){
        this.mongoClient = new mongoDb();
        this.mongoClient.getConnection().then(arg=>{
        this.db = arg;
        })
    }

    findDocuments = function(objJSON, callback) {
        const collection = this.db.collection('documents');
        collection.find(objJSON).toArray(function(err, result) {
            assert.equal(null, err);
            callback(result);
        });
    }

}
module.exports = documentsService