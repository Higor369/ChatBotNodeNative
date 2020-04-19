const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoDb = require('../infra/mongo');

const config = require('../config');
const indexCrud = require('../src/controlers/indexCrudControler')

let db = null;


mongoDb.getConnection().then((dbResult) =>{
	
	console.log('rodandooooo');
});


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

app.use('/', urlencodedParser, indexCrud);

module.exports = app;   