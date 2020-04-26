const express = require('express');
const app = express();
const bodyParser = require('body-parser');

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

const indexRouter = require('../src/controlers/indexCrudControler')
const userRouter = require('../src/controlers/userControler')
const pagRouter = require('../src/controlers/pagsControler')
const documentsRouter = require('../src/controlers/documentsControler')
const adminRouter = require('../src/controlers/adminControler');

app.use('/', urlencodedParser, pagRouter);
app.use('/chatbot', urlencodedParser, indexRouter);
app.use('/user',urlencodedParser,userRouter);
app.use('/documents', urlencodedParser, documentsRouter);
app.use('/admin', urlencodedParser, adminRouter);

module.exports = app;   