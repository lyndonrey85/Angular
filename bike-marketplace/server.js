var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

const path = require('path'); 
app.use(express.static(path.join(__dirname, '/client/dist')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(session({secret: 'sashay'}));

mongoose.Promise = global.Promise;

require('./server/config/mongoose.js');

var router = require('./server/config/routes.js');
router(app);

// var PORT = 8000;
// var line = "\n************************\n"
// app.listen(8000, function(){
// 	console.log(line + "Bike Marketplace\nListening on port " + PORT + line);
// })
app.listen(8000, function() {
    console.log("listening on port 8000");
   });