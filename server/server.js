//server/server.js

var express = require('express');
var router = require('./routes/routes.js')
var path = require('path');
var app = express();
const connectDB = require('./database/db')
const seedDB = require('./database/seed')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));


app.use(express.static(path.join(__dirname, '../client')));
app.use('/', router);

// Connect database
seedDB();
connectDB();

var port = 8000
app.listen(port, function () {
	console.log('running at localhost: ' + port);
});

module.exports = app;

app.get("/*", function (req, res) {
	res.render(__dirname + "/../client/index.ejs");
});