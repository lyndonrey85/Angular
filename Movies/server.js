const express = require("express");
const bodyParser = require("body-parser");
// const morgan = require("morgan");
// const session = require("express-session");
const port = 8000;
const app = express();

app.use(express.static(__dirname + '/client/dist'));
app.use(bodyParser.json());
// app.use(session({
//     secret: 'sashay',
//     resave: false,
//     saveUninitialized: true
// }))

require('./server/config/mongoose');

require('./server/config/routes')(app);

app.listen(8000, function() {
    console.log("listening on port 8000");
   });