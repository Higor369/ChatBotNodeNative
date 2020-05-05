
const assert = require('assert');

const mongoDb = require('../../infra/mongo');
const CapturaDeDados = require('../services/capturaDeDadosService')

class indexCrud{

	
constructor(){
	this.caputuraDeDados = new CapturaDeDados();
	this.mongoClient = new mongoDb();
	this.mongoClient.getConnection().then(arg=>{
	this.db = arg;

	});
}


questionData = function(objJSON, callback) {
	const collection = this.db.collection('chatbot');
	collection.find(objJSON).toArray(function(err, result) {
		assert.equal(null, err);
		if(result.length<=0) {
			let code_before = Number(objJSON.code_before);
			let objFind = {};
			if(code_before>0) {
				objFind = {
					code_user: Number(objJSON.code_user),
					code_relation: code_before
				};
			}else {
				objFind = {
					code_user: Number(objJSON.code_user)
				};
			}
			collection.find(objFind).toArray(function(err, result) {
				assert.equal(null, err);
				if(result.length<=0) {
					const questionUser = this.abreviacoes(objJSON.input);
					collection.find({code_user: Number(objJSON.code_user)}).toArray(function(err, result) {
						result = this.naturalLanguage(objJSON.input, result, Number(objJSON.code_user));
						callback(result);
					});
				}else {
					const questionUser = this.abreviacoes(objJSON.input);
					result = nlp(objJSON.input, result, Number(objJSON.code_user));
					callback(result);					
				}
			});
		}else callback(result);
	});
}


abreviacoes = function(Input='') {
	
		Input = Input.toString().trim();
		let result = Input.replace(/ vc /g, 'você');
		result = result.replace(/ tb /g, 'também');
		result = result.replace(/ oq /g, 'o que');
		result = result.replace(/ dq /g, 'de que');
		result = result.replace(/ td /g, 'tudo');
		result = result.replace(/ pq /g, 'por quê');
		result.toString().trim();
		return result;
	
	}

 naturalLanguage = function(question='', array=[], code_user=-1) {
	let originalQuestion = question.toString().trim();
	let findInput = 0;
	let findIndex = 0;

	let documents = this.caputuraDeDados.getDocuments(originalQuestion, code_user);
	if(documents) {
		return [{
					"_id": "0",
					"code_user": code_user,
					"activate": 1,
					"code_current": -1,
					"code_relation": -1,
					"code_before": -1,
					"input": originalQuestion,
					"output": "Ok! Entendido."		
				}];
	}else {
		for(let i=0; i<array.length; i++) {
			question = question.toString().trim();
			let input = array[i].input.toString().trim();
			if(input.length<=0) input = array[i].output.toString().trim();
			question = question.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
			input = input.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
			question = question.replace(/[^a-zA-Z0-9\s]/g, '');
			input = input.replace(/[^a-zA-Z0-9\s]/g, '');

			let tokenizationQuestion = question.split(' ');
			let tokenizationInput = input.split(' ');

			tokenizationQuestion = tokenizationQuestion.map(function(e) {
				if(e.length>3) return e.substr(0, e.length-3); else return e;
			});
			tokenizationInput = tokenizationInput.map(function(e) {
				if(e.length>3) return e.substr(0, e.length-3); else return e;
			});

			let words = 0;
			for(let x=0; x<tokenizationQuestion.length; x++) {
				if(tokenizationInput.indexOf(tokenizationQuestion[x])>=0) words++;
			}
			if(words>findInput) {
				findInput = words;
				findIndex = i;
			}
		}

		if(findInput>0) return [{
			"_id": array[findIndex]._id,
			"code_user": array[findIndex].code_user,
			"activate": array[findIndex].activate,
			"code_current": array[findIndex].code_current,
			"code_relation": array[findIndex].code_relation,
			"code_before": array[findIndex].code_before,
			"input": originalQuestion,
			"output": array[findIndex].output
		}];
		else return [{
			"_id": "0",
			"code_user": array[findIndex].code_user,
			"activate": array[findIndex].activate,
			"code_current": array[findIndex].code_current,
			"code_relation": array[findIndex].code_relation,
			"code_before": array[findIndex].code_before,
			"input": originalQuestion,
			"output": "Desculpe, mas não sei te responder."		
		}];
	}
}
	




insertData = function(objJSON, callback){
	const collection = this.db.collection('chatbot');
	collection.insertOne(objJSON,function(erro,result){
		assert.equal(null,erro);
		callback(result);
	})
}
updateData = function(objJSON, callback){
	const collection = this.db.collection('chatbot');
	const code_current = objJSON.code_current;
	collection.updateOne({code_current: code_current},{$set: objJSON},function(erro,result){
		assert.equal(null,erro);
		callback(result);
	})
}
deleteData = function(objJSON, callback){
	const collection = this.db.collection('chatbot');
	collection.deleteOne(objJSON,function(erro,result){
		assert.equal(null,erro);
		callback(result);
	})
}
selectData = function(objJSON, callback){
	const collection = this.db.collection('chatbot');	
	collection.find(objJSON).toArray(function(erro, result){
		assert.equal(null,erro);
		callback(result);
	})
}

 cod = function(){
	const data = new Date();
	const ano = data.getFullYear();
	const mes = data.getMonth();
	const dia = data.getDay();
	const hora = data.getHours();
	const minuto = data.getMinutes();
	const segundo = data.getSeconds();
	const milesegundos = data.getMilliseconds();
	const result = parseInt(Number(`${ano}${mes}${dia}${hora}${minuto}${segundo}${milesegundos}`)/2);
	console.log(result);
	return result;
}

findData = function(objJSON, callback) {
	
		const collection = this.b.collection('chatbot');
		collection.find(objJSON).toArray(function(err, result) {
			assert.equal(null, err);
			callback(result);
		})
}




}
module.exports = indexCrud



