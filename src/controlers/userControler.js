const express = require('express');
const router = express.Router();
const UserService = require('../services/userService');

const userService = new UserService();

router.post('/insert', function(req,res){
	let objJSON = {};
	if(req.body.code_user) objJSON.code_user = req.body.code_user; else objJSON.code_user = userService.cod();
	if(req.body.activate) objJSON.activate = req.body.activate; else objJSON.activate = true;
	if(req.body.full_name) objJSON.full_name = req.body.full_name; else objJSON.full_name = '';
	if(req.body.user_name) objJSON.user_name = req.body.user_name; else objJSON.user_name = '';
	if(req.body.email) objJSON.email = req.body.email; else objJSON.email = '';
	if(req.body.password) objJSON.password = req.body.password; else objJSON.password = '';

	console.log(objJSON);
	userService.insertUser(objJSON, function(result){
		res.send(result);
	})
})

router.post('/update', function(req, res) {
	let objJSON = {};
	if(req.body.code_user) objJSON.code_user = req.body.code_user;
	if(req.body.activate) objJSON.activate = req.body.activate;
	if(req.body.full_name) objJSON.full_name = req.body.full_name;
	if(req.body.user_name) objJSON.user_name = req.body.user_name;
	if(req.body.email) objJSON.email = req.body.email;
	if(req.body.password) objJSON.password = req.body.password;

	userService.updateUser(objJSON, function(result) {
		res.send(result);
	});
});

router.post('/delete', function(req, res) {
	let objJSON = {};
	if(req.body.code_user) objJSON.code_user = req.body.code_user;
	if(req.body.activate) objJSON.activate = req.body.activate;
	if(req.body.full_name) objJSON.full_name = req.body.full_name;
	if(req.body.user_name) objJSON.user_name = req.body.user_name;
	if(req.body.email) objJSON.email = req.body.email;
	if(req.body.password) objJSON.password = req.body.password;

	userService.deleteUser(objJSON, function(result) {
		res.send(result);
	});
});

router.post('/find', function(req, res) {
	let objJSON = {};
	if(req.body.code_user) objJSON.code_user = req.body.code_user;
	if(req.body.activate) objJSON.activate = req.body.activate;
	if(req.body.full_name) objJSON.full_name = req.body.full_name;
	if(req.body.user_name) objJSON.user_name = req.body.user_name;
	if(req.body.email) objJSON.email = req.body.email;
	if(req.body.password) objJSON.password = req.body.password;

	userService.findUser(objJSON, function(result) {
		res.send(result);
	});
});

router.post('/activate/true', function(req, res) {
	let objJSON = {};
	if(req.body.code_user) objJSON.code_user = req.body.code_user; else objJSON.code_user = 0;

	userService.activateUserTrue(objJSON, function(result) {
		res.send(result);
	});
});

router.post('/activate/false', function(req, res) {
	let objJSON = {};
	if(req.body.code_user) objJSON.code_user = req.body.code_user; else objJSON.code_user = 0;

	userService.activateUserFalse(objJSON, function(result) {
		res.send(result);
	});
});

router.post('/delete/all', function(req, res) {
	let objJSON = {};
	if(req.body.code_user) objJSON.code_user = req.body.code_user; else objJSON.code_user = 0;

	userService.deleteUserAll(objJSON, function(result) {
		res.send(result);
	});
});

module.exports = router

