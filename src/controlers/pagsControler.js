const express = require('express');
const router = express.Router();
const UserService = require('../services/userService');


const userService = new UserService();


router.get('/', function(req, res) {	
		res.set('Content-Type', 'text/html');
		const fs = require('fs');
		const data = fs.readFileSync('./src/views/html/home.html', 'utf8');
		res.send(data);
});
router.get('/home', function(req, res) {	
		res.set('Content-Type', 'text/html');
		const fs = require('fs');
		const data = fs.readFileSync('./src/views/html/home.html', 'utf8');
		res.send(data);
	
});
router.get('/login' ,function(req,res){
    res.set('Content-Type' , 'text/html');
    const fs = require('fs');
    var path = "./src/views/html/login.html";
    console.log(path)
    const data = fs.readFileSync(path,'utf8');
    res.send(data);

})
router.get('/admin', function(req, res) {
	res.set('Content-Type', 'text/html');
	const fs = require('fs');
	const data = fs.readFileSync('./src/views/html/admin.html', 'utf8');
	res.send(data);
});

router.get('/index' ,function(req,res){
    let objJSON = {};
	if(req.query.user_name) objJSON.user_name = req.query.user_name; 
	else objJSON.user_name = false;
	if(req.query.password) objJSON.password = req.query.password; 
	else objJSON.password = false;

	userService.findUserOne(objJSON, function(result) {
		if((result)&&(result.activate==1)) {
			let code_user = Number(result.code_user);
			res.set('Content-Type', 'text/html');
			const fs = require('fs');
			const data = fs.readFileSync('./src/views/html/index.html', 'utf8');
			data = data.replace('[code_user]', code_user);
				data = data.replace('[code_user]', code_user);
				data = data.replace('[code_user]', code_user);
				res.send(data);	
			
		}else {
			res.set('Content-Type', 'text/html');
			const fs = require('fs');
			const data = fs.readFileSync('./src/views/html/login.html', 'utf8');
			res.send(data);
		}
	});
});


router.get('/chatbot', function(req, res) {

		let code_user = -1;
		if(req.query.code_user) code_user = Number(req.query.code_user);

		res.set('Content-Type', 'text/html');
		const fs = require('fs');
		let data = fs.readFileSync('./src/views/html/chatbot.html', 'utf8');
		data = data.replace('[code_user]', code_user);
		res.send(data);
});

module.exports = router