//server/server.js

let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');

const path = require('path');
const PORT = 8000; //server port

const mongoose = require("mongoose")
const connectDB = require('./db')
const seedDB = require('./seed')

const router = require('./routes')
const accountRouter = require('./Account/Account.route')
const documentRouter = require('./Document/Document.route')
const permissionRouter = require('./Permission/Permission.route')

const passport = require('passport');
require('./passport-config')(passport);
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash');

seedDB(); // Populate database with test data

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

// Express Session
app.use(
	session({
		secret: 'spooky', //pick a random string to make the hash that is generated secure
		resave: false, //required
		saveUninitialized: false //required
	})
)
app.use(flash());

// Passport
//app.use(express.static(__dirname + '../public'));
app.use(passport.initialize())
app.use(passport.session()) // calls serializeUser and deserializeUser

app.use(cors());
//app.use('/', router);
app.use('/accounts', accountRouter);
app.use('/documents', documentRouter);
app.use('/permissions', permissionRouter);

app.set('view engine', 'html');
app.set('views', path.join(__dirname, '../public'));
app.engine('html', require('ejs').renderFile);

var socketio = require('socket.io');
var ioserver = require('http').createServer(app);
var allowedOrigins = "http://localhost:* http://127.0.0.1:*";

var io = socketio(ioserver, {
	origins: allowedOrigins
});

io.on('connection', function (socket) {
	console.log("User connected")
	socket.on('joinsession', function (data) {
		console.log("\tjoining session " + data.room)
		socket.join(data.room);
		var room = io.sockets.adapter.rooms[data.room];
		console.log("\t" + room.length + " user(s) connected")
		io.in("" + data.room).emit('usercount', room.length);

		socket.on('addstaff', function (data) {
			console.log("Staff added in " + data.room)
			io.in("" + data.room).emit("addstaff");
		})
		socket.on('addnote', function (data) {
			console.log("addnote")
			console.log(data)
			io.in("" + data.room).emit("addnote", data.staff, data.note);
		})

		socket.on('disconnect', function () {
			io.in("" + data.room).emit('usercount', room.length);
			console.log('User Disconnected')
		});
	})
})

ioserver.listen(3001);

app.listen(PORT, function () {
	console.log('running at localhost: ' + PORT);
});

module.exports = app;