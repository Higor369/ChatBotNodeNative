
const assert = require('assert');

const mongoDb = require('../../infra/mongo');

let db;

mongoDb.getConnection().then((dbResult) =>{
	
	db = dbResult;
	
});

exports.questionData= function(objJSON,callback){
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

				result = naturalLanguage(objJSON.input,result);
				callback(result)
			})
		}
		else{
			callback(result);
		}
	});
}

const naturalLanguage = function(question,array){
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
			"code_session": array[findIndex].code_session,
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
			"code_session": array[findIndex].code_session,
			"code_current": array[findIndex].code_current,
			"code_ralation": array[findIndex].code_relation,
			"code_before": array[findIndex].code_before,
			"input": originalQuestion,
			"output": "desculpe, não consegui entender a sua pergunta :("
		}]
	}


}

exports.insertData = function(objJSON, callback){
	const collection = db.collection('chatbot');
	collection.insertOne(objJSON,function(erro,result){
		assert.equal(null,erro);
		callback(result);
	})
}
exports.updateData = function(objJSON, callback){
	const collection = db.collection('chatbot');
	const code_current = objJSON.code_current;
	collection.updateOne({code_current: code_current},{$set: objJSON},function(erro,result){
		assert.equal(null,erro);
		callback(result);
	})
}
exports.deleteData = function(objJSON, callback){
	const collection = db.collection('chatbot');
	collection.deleteOne(objJSON,function(erro,result){
		assert.equal(null,erro);
		callback(result);
	})
}
exports.selectData = function(objJSON, callback){
	const collection = db.collection('chatbot');	
	collection.find(objJSON).toArray(function(erro, result){
		assert.equal(null,erro);
		callback(result);
	})
}

const cod = function(){
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

exports.constroiObjJsonQuestion = function(req){
	let objJSON = {};

	if(req.query.code_user){
		objJSON.code_user = Number(req.query.code_user)
	}
	else{
		objJSON.code_user = 0;
	}
	if(req.query.code_session){
		objJSON.code_session = Number(req.query.code_session);
	}
	else{
		objJSON.code_session = 0;
	}
	if(req.query.code_before){
		objJSON.code_before = Number(req.query.code_before);
	}
	else{
		objJSON.code_before = 0;
	}
	if(req.query.input){
		objJSON.input = req.query.input;
	}
	else{
		objJSON.input = "";
	}

	return objJSON
}

exports.constroiObjJsonInsert = function(req){

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
	if(req.body.code_relation){
		objJSON.code_relation = req.body.code_relation;
	}
	else{
		req.body.code_relation = 0;
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

exports.constroiObjJsonUpdate= function(req){

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
	if(req.body.code_ralation){
		objJSON.code_ralation = req.body.code_ralation;
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

exports.constroiObjJsonFind= function(req){

	let objJSON = {};

	if(req.body.code_user){
		objJSON.code_user = req.body.code_user;
	}
	if(req.body.code_ralation){
		objJSON.code_ralation = req.body.code_ralation;
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