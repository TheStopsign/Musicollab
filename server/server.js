//server/server.js

var express = require('express');
var router = require('./routes/routes.js')
var path = require('path');
var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));


app.use(express.static(path.join(__dirname, '../client')));
app.use('/', router);

var port = 8000
app.listen(port, function () {
	console.log('running at localhost: ' + port);
});

module.exports = app;