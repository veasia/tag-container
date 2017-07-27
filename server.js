//Initiallising node modules
require('dotenv').config()
var express = require("express");
var app = express();

var path = require("path");
var bodyParser = require("body-parser");

var config = require("./config");
var router = express.Router()
var merchants = require('./Routes/merchants.js')(router);
var deploy = require('./Routes/deploy.js')(router);

var app = express();
app.set('port', process.env.PORT || 3001);

// app.use(require('morgan')('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/version', (req, res) => {
    res.json({version:config.api.version})
});


var authentication = require('./auth.js');
authentication.init(app);

// app.use(`/api/${config.api.version}/*`, authentication.requireAuthentication())
app.use(`/api/${config.api.version}/merchants`,  merchants);
app.use(`/api/${config.api.version}/deploy`,  deploy);

// if (process.env.NODE_ENV === "production") {
     app.use(authentication.requireAuthentication(), express.static(path.join(__dirname, 'client/build')));
// }

app.all('*',authentication.requireAuthentication(), (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});