const express = require('express');
const router = express.Router();
const crudService = require('../services/indexCrudService')

router.post('/insert', function(req,res){
	
	var objJSON = crudService.constroiObjJsonInsert(req)
	console.log(objJSON);
	crudService.insertData(objJSON, function(result){
		res.send(result);
	})
})

router.post('/update', function(req,res){
	
	var objJSON = crudService.constroiObjJsonUpdate(req)
	
	crudService.updateData(objJSON, function(result){
		res.send(result);
	})
})

router.post('/delete', function(req,res){
	
	var objJSON = crudService.constroiObjJsonUpdate(req)
	
	crudService.deleteData(objJSON, function(result){
		res.send(result);
	})
})

router.post('/find', function(req,res){
	
	var objJSON = crudService.constroiObjJsonFind(req)
	
	crudService.selectData(objJSON, function(result){
		res.send(result);
	})
})

router.get('/question', function(req,res){
	let objJSON = crudService.constroiObjJsonQuestion(req);
	
	crudService.questionData(objJSON,function(result){
		res.send(result);
	})
})

module.exports = router
