
const assert = require('assert');

const mongoDb = require('../../infra/mongo');


class indexCrud{

	
constructor(){
	this.mongoClient = new mongoDb();
	this.mongoClient.getConnection().then(arg=>{
	this.db = arg;

	});
}


questionData= function(objJSON,callback){
	const collection = db.collection('chatbot');
	collection.find(objJSON).toArray(function(err,result){
		assert.equal(null,err);
		if(result.length<=0){
			let code_before = Number(objJSON.code_before);
			let objFind = {};
			if(code_before>0){
				objFind= {
					code_user: objJSON.code_user,
					code_relation: code_before
				}
			}
			else{
				objFind= {
					code_user: objJSON.code_user
				}
			}
			collection.find(objFind).toArray(function(err,result){
                assert.equal(null,err);
                if(result.length<=0){
                    collection.find({code_user:objJSON.code_user}).toArray(function(err,result){
                        result = naturalLanguage(objJSON.input,result);
                        callback(result)
                })
            }else{
                result = naturalLanguage(objJSON.input,result);
                callback(result)
            }
			})
		}
		else{
			callback(result);
		}
	});
}

 naturalLanguage = function(question,array){
	let originalQuestion = question.toString().trim();
	let findInput = 0;
	let findIndex = 0;
	for(let i=0; i<array.length; i++){
		question = question.toString().trim();
		let input = array[i].input.toString().trim();

		if(input.length<=0){
			input = array[i].output.toString().trim();
		}
		question = question.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
		input = input.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
		question = question.replace(/[^a-zA-z0-9\s]/g,'');
		input = input.replace(/[^a-zA-z0-9\s]/g,'');

		let tokenizationQuestion = question.split(' ');
		let tokenizationInput = input.split(' ');

		tokenizationQuestion = tokenizationQuestion.map(function(e){
			if(e.length>3){
				return e.substr(0,e.length-3);
			}else{
				return e;
			}
		});
		tokenizationInput = tokenizationInput.map(function(e){
			if(e.length>3){
				return e.substr(0,e.length-3);
			}else{
				return e;
			}
		});

		let words = 0;
		for(let x=0; x<tokenizationQuestion.length;x++){
			if(tokenizationInput.indexOf(tokenizationQuestion[0])>=0){
				words++
			}			
		}
		if(words>findInput){
			findInput = words;
			findIndex = i;
		}
	}
	if(findInput>0){
		return[{
			"_id": array[findIndex]._id,
            "code_user": array[findIndex].code_user,
            "code_user_activate": array[findIndex].code_user_activate,
			"code_current": array[findIndex].code_current,
			"code_ralation": array[findIndex].code_relation,
			"code_before": array[findIndex].code_before,
			"input": originalQuestion,
			"output": array[findIndex].output
		}]
	}
	else{
		return [{
			"_id": 0,
            "code_user": array[findIndex].code_user,
            "code_user_activate": array[findIndex].code_user_activate,
			"code_current": array[findIndex].code_current,
			"code_ralation": array[findIndex].code_relation,
			"code_before": array[findIndex].code_before,
			"input": originalQuestion,
			"output": "desculpe, não consegui entender a sua pergunta :("
		}]
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
	const collection = db.collection('chatbot');
	const code_current = objJSON.code_current;
	collection.updateOne({code_current: code_current},{$set: objJSON},function(erro,result){
		assert.equal(null,erro);
		callback(result);
	})
}
deleteData = function(objJSON, callback){
	const collection = db.collection('chatbot');
	collection.deleteOne(objJSON,function(erro,result){
		assert.equal(null,erro);
		callback(result);
	})
}
selectData = function(objJSON, callback){
	const collection = db.collection('chatbot');	
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
}

module.exports = indexCrud



