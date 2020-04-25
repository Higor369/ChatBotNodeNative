const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('../config');
const indexCrud = require('../src/controlers/indexCrudControler')
const userRouter = require('../src/controlers/userControler')
const pagRouter = require('../src/controlers/pagsControler')
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
app.use('/css', express.static('c:/Users/higor/Desktop/chatBot/node_modules/bootstrap/dist/css'));
app.use('/js', express.static('c:/Users/higor/Desktop/chatBot/node_modules/jquery/dist/'));
app.use('/js', express.static('c:/Users/higor/Desktop/chatBot/node_modules/popper.js/dist'));
app.use('/js', express.static('c:/Users/higor/Desktop/chatBot/node_modules/bootstrap/dist/js'));
app.use('/js', express.static('c:/Users/higor/Desktop/chatBot/src/views/javascript'))

console.log(__dirname);


//cors
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use('/', urlencodedParser, pagRouter);
app.use('/chatbot', urlencodedParser, indexCrud);
app.use('/user',urlencodedParser,userRouter);

module.exports = app;   