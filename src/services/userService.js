const mongoDb = require('../../infra/mongo');
const mongoClient = new mongoDb();
const assert = require('assert');





class userService {


    constructor(){
        this.mongoClient = new mongoDb();
        this.mongoClient.getConnection().then(arg=>{
        this.db = arg;
    
        });
    }
    

     cod = function(){
        const data = new Date();
        const hora = data.getHours();
        const minuto = data.getMinutes();
        const segundo = data.getSeconds();
        const milesegundos = data.getMilliseconds();
        const result = parseInt(Number(`${hora}${minuto}${segundo}${milesegundos}`)/2);
        console.log(result);
        return result;
    }



     insertUser = function(objJSON, callback) {
        const collection = db.collection('user');
        collection.insertOne(objJSON, function(err, result) {
            assert.equal(null, err);
            callback(result);
        });
    }
    
     updateUser = function(objJSON, callback) {
        const collection = db.collection('user');
        const code_user = objJSON.code_user;
        collection.updateOne({code_user: code_user}, {$set: objJSON}, function(err, result) {
            assert.equal(null, err);
            callback(result);
        });
    }
    
     deleteUser = function(objJSON, callback) {
        const collection = db.collection('user');
        collection.deleteOne(objJSON, function(err, result) {
            assert.equal(null, err);
            callback(result);
        });
    }
    
     findUser = function(objJSON, callback) {
        const collection = db.collection('user');
        collection.find(objJSON).toArray(function(err, result) {
            assert.equal(null, err);
            callback(result);
        });
    }

     activateUserTrue = function(objJSON, callback) {
        const collection = db.collection('user');
        const code_user = objJSON.code_user;
        collection.updateMany({code_user: code_user}, {$set: {activate: true}}, function(err, result) {
            assert.equal(null, err);
            callback(result);
        });
    }

     activateUserFalse = function(objJSON, callback) {
        const collection = db.collection('user');
        const code_user = objJSON.code_user;
        collection.updateMany({code_user: code_user}, {$set: {activate: false}}, function(err, result) {
            assert.equal(null, err);
            callback(result);
        });
    }
    
     deleteUserAll = function(objJSON, callback) {
        const collection = db.collection('user');
        collection.deleteMany(objJSON, function(err, result) {
            assert.equal(null, err);
            callback(result);
        });
    }

}

module.exports = userService
