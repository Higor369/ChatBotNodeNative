const express = require('express');
const router = express.Router();
const CrudService = require('../services/indexCrudService')

const crudService = new CrudService()

router.post('/insert', function(req,res){
	
	let objJSON = {};
	if(req.body.code_user) objJSON.code_user = Number(req.body.code_user); else objJSON.code_user = 0;
	if(req.body.activate) objJSON.activate = Number(req.body.activate); else objJSON.activate = 1;
	if(req.body.code_current) objJSON.code_current = Number(req.body.code_current); else objJSON.code_current = cod();
	if(req.body.code_relation) objJSON.code_relation = Number(req.body.code_relation); else objJSON.code_relation = 0;
	if(req.body.code_before) objJSON.code_before = Number(req.body.code_before); else objJSON.code_before = 0;
	if(req.body.input) objJSON.input = req.body.input; else objJSON.input = '';
	if(req.body.output) objJSON.output = req.body.output; else objJSON.output = 'Desculpe, mas não entendi.';

	console.log(objJSON);
	crudService.insertData(objJSON, function(result){
		res.send(result);
	})
})

router.post('/update', function(req,res){
	
	let objJSON = {};
	if(req.body.code_user) objJSON.code_user = Number(req.body.code_user);
	if(req.body.activate) objJSON.activate = Number(req.body.activate);
	if(req.body.code_current) objJSON.code_current = Number(req.body.code_current);
	if(req.body.code_relation) objJSON.code_relation = Number(req.body.code_relation);
	if(req.body.code_before) objJSON.code_before = Number(req.body.code_before);
	if(req.body.input) objJSON.input = req.body.input;
	if(req.body.output) objJSON.output = req.body.output;

	crudService.updateData(objJSON, function(result){
		res.send(result);
	})
})

router.post('/delete', function(req,res){
	
	let objJSON = {};
	if(req.body.code_user) objJSON.code_user = Number(req.body.code_user);
	if(req.body.activate) objJSON.activate = Number(req.body.activate);
	if(req.body.code_current) objJSON.code_current = Number(req.body.code_current);
	if(req.body.code_relation) objJSON.code_relation = Number(req.body.code_relation);
	if(req.body.code_before) objJSON.code_before = Number(req.body.code_before);
	if(req.body.input) objJSON.input = req.body.input;
	if(req.body.output) objJSON.output = req.body.output;

	crudService.deleteData(objJSON, function(result){
		res.send(result);
	})
})

router.post('/find', function(req,res){
	
	let objJSON = {};
	if(req.body.code_user) objJSON.code_user = Number(req.body.code_user);
	if(req.body.activate) objJSON.activate = Number(req.body.activate);
	if(req.body.code_current) objJSON.code_current = Number(req.body.code_current);
	if(req.body.code_relation) objJSON.code_relation = Number(req.body.code_relation);
	if(req.body.code_before) objJSON.code_before = Number(req.body.code_before);
	if(req.body.input) objJSON.input = req.body.input;
	if(req.body.output) objJSON.output = req.body.output;

	crudService.selectData(objJSON, function(result){
		res.send(result);
	})
})

router.get('/question', function(req,res){
	let objJSON = {};
	if(req.query.code_user) objJSON.code_user = Number(req.query.code_user); else objJSON.code_user = 0;
	if(req.body.activate) objJSON.activate = req.body.activate; else objJSON.activate = true;
	if(req.query.code_before) objJSON.code_before = Number(req.query.code_before); else objJSON.code_before = 0;
	if(req.query.input) objJSON.input = req.query.input; else objJSON.input = '';
	
	crudService.questionData(objJSON,function(result){
		res.send(result);
	})
})

module.exports = router
