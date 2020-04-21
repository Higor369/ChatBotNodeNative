const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('../config');
const indexCrud = require('../src/controlers/indexCrudControler')
const userRouter = require('../src/controlers/userControler')

// let db = null;

// const mongoDb = require('../infra/mongo');
// const mongoClient = new mongoDb('local');

// mongoClient.getConnection().then((dbResult) =>{
	
// 	db = dbResult;
	
// });


const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(jsonParser);
app.use(urlencodedParser);



//cors
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/chatbot', urlencodedParser, indexCrud);
app.use('/user',urlencodedParser,userRouter);

module.exports = app;   