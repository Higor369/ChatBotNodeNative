const express = require('express');
const router = express.Router();
const UserService = require('../services/userService');


const userService = new UserService();

router.get('/login' ,function(req,res){

    res.set('Content-Type' , 'text/html');
    const fs = require('fs');
    var aaa = "./src/views/html/login.html";
    console.log(aaa)
    const data = fs.readFileSync(aaa,'utf8');
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
			res.set('Content-Type', 'text/html');
			const fs = require('fs');
			const data = fs.readFileSync('./src/views/html/index.html', 'utf8');
			res.send(data);	
		}else {
			res.set('Content-Type', 'text/html');
			const fs = require('fs');
			const data = fs.readFileSync('./src/views/html/login.html', 'utf8');
			res.send(data);
		}
	});
});


module.exports = router