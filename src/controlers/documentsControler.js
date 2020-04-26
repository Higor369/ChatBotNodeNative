const express = require('express');
const router = express.Router();
const DocumentsService = require('../services/documentsService');

const documentsService = new DocumentsService();

router.post('/documents/find', urlencodedParser, function(req, res) {
	let objJSON = {};
	if(req.body.code_user) objJSON.code_user = Number(req.body.code_user); 
	else objJSON.code_user = -1;
	if(req.body.activate) objJSON.activate = Number(req.body.activate); 
	else objJSON.activate = 1;

	documentsService.findDocuments(objJSON, function(result) {
		res.send(result);
	});
});

module.exports = router