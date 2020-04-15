const express = require('express');
const app = express();
const assert = require('assert');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;

let db = null;
const url = 'mongodb://localhost:27017';
const dbName = 'local';

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(jsonParser);
app.use(urlencodedParser);

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
	assert.equal(null, err);
	console.log('banco de dados conectado com sucesso.');

	db = client.db(dbName);
});

app.listen(3000);
console.log('rodandooooo');

app.post('/insert', urlencodedParser, function(req,res){
	
	var objJSON = constroiObjJsonInsert(req)
	
	insertData(objJSON, function(result){
		res.send(result);
	})
})

app.post('/update', urlencodedParser, function(req,res){
	
	var objJSON = constroiObjJsonUpdate(req)
	
	updateData(objJSON, function(result){
		res.send(result);
	})
})

app.post('/delete', urlencodedParser, function(req,res){
	
	var objJSON = constroiObjJsonUpdate(req)
	
	deleteData(objJSON, function(result){
		res.send(result);
	})
})

app.post('/find', urlencodedParser, function(req,res){
	
	var objJSON = constroiObjJsonFind(req)
	
	selectData(objJSON, function(result){
		res.send(result);
	})
})

const insertData = function(objJSON, callback){
	const collection = db.collection('chatbot');
	collection.insertOne(objJSON,function(erro,result){
		assert.equal(null,erro);
		callback(result);
	})
}
const updateData = function(objJSON, callback){
	const collection = db.collection('chatbot');
	const code_current = objJSON.code_current;
	collection.updateOne({code_current: code_current},{$set: objJSON},function(erro,result){
		assert.equal(null,erro);
		callback(result);
	})
}
const deleteData = function(objJSON, callback){
	const collection = db.collection('chatbot');
	collection.deleteOne(objJSON,function(erro,result){
		assert.equal(null,erro);
		callback(result);
	})
}
const selectData = function(objJSON, callback){
	const collection = db.collection('chatbot');	
	collection.find(objJSON).toArray(function(erro, result){
		assert.equal(null,erro);
		callback(result);
	})
}

function cod(){
	const data = new Date();
	const ano = data.getFullYear();
	const mes = data.getMonth();
	const dia = data.getDay();
	const hora = data.getHours();
	const minuto = data.getMinutes();
	const segundo = data.getSeconds();
	const milesegundos = data.getMilliseconds();
	const result = parseInt(Number(`${ano}${mes}${dia}${hora}${minuto}${segundo}${milesegundos}`)/2)
	return result;
}

function constroiObjJsonInsert(req){

	let objJSON = {};

	if(req.body.code_user){
		objJSON.code_user = req.body.code_user;
	}
	else{
		objJSON.code_user = 0;
	}
	if(req.body.code_session){
		objJSON.code_session = req.body.code_session;
	}
	else{
		objJSON.code_session = 0;
	}
	if(req.body.code_current){
		objJSON.code_current = req.body.code_current;
	}
	else{
		objJSON.code_current = cod();
	}
	if(req.body.code_before){
		objJSON.code_before = req.body.code_before;
	}
	else{
		objJSON.code_before = 0
	}
	if(req.body.input){
		objJSON.input = req.body.input;
	}
	else{
		objJSON.input = "";
	}
	if(req.body.output){
		objJSON.output = req.body.output;
	}
	else{
		objJSON.output = 'Perdão, não entendi sua pergunta :(';
	}

	return objJSON

}

function constroiObjJsonUpdate(req){

	let objJSON = {};

	if(req.body.code_user){
		objJSON.code_user = req.body.code_user;
	}
	if(req.body.code_session){
		objJSON.code_session = req.body.code_session;
	}
	if(req.body.code_current){
		objJSON.code_current = req.body.code_current;
	}
	if(req.body.code_before){
		objJSON.code_before = req.body.code_before;
	}
	if(req.body.input){
		objJSON.input = req.body.input;
	}
	if(req.body.output){
		objJSON.output = req.body.output;
	}

	return objJSON

}

function constroiObjJsonFind(req){

	let objJSON = {};

	if(req.body.code_user){
		objJSON.code_user = req.body.code_user;
	}
	
	if(req.body.code_session){
		objJSON.code_session = req.body.code_session;
	}
	if(req.body.code_current){
		objJSON.code_current = req.body.code_current;
	}
	if(req.body.code_before){
		objJSON.code_before = req.body.code_before;
	}
	if(req.body.input){
		objJSON.input = req.body.input;
	}
	if(req.body.output){
		objJSON.output = req.body.output;
	}

	return objJSON

}