const express = require('express');
const router = express.Router();
const AdminService = require('../services/adminService')

const adminService = new AdminService();

router.post('/search', function(req, res) {
	let objJSON = {};
	if(req.body.user_name) objJSON.user_name = req.body.user_name; 
	else objJSON.user_name = false;
	if(req.body.password) objJSON.password = req.body.password; 
	else objJSON.password = false;

	adminService.findAdmin(objJSON, function(result) {
		if(result) res.send(result);
		else res.send({user_name: false, password: false});
	});
});

module.exports = router;

