const assert = require('assert');
const mongoDb = require('../../infra/mongo');

class adminService{

    constructor(){
        this.mongoClient = new mongoDb();
        this.mongoClient.getConnection().then(arg=>{
        this.db = arg;
    })
}
findAdmin = function(objJSON, callback) {
	const collection = this.db.collection('admin');
	collection.findOne(objJSON, function(err, result) {
		assert.equal(null, err);
		callback(result);
	})
}


}

module.exports = adminService