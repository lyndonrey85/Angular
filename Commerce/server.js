const express = require("express");
const bodyParser = require("body-parser");
const port = 8000;
const app = express();

app.use(express.static(__dirname + '/client/dist'));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true}));

require('./server/config/mongoose');

require('./server/config/routes')(app);

app.listen(8000, function() {
    console.log("listening on port 8000");
   });