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
app.use(passport.initialize())
app.use(passport.session()) // calls serializeUser and deserializeUser

app.use(cors());
// app.use('/', router);
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

var roomHistory = new Map()

io.on('connection', function (socket) {
	console.log("User connected")
	socket.on('joinsession', function (data) {
		console.log("\tjoining session " + data.room)
		socket.join(data.room);
		var room = io.sockets.adapter.rooms[data.room];
		console.log("\t" + room.length + " user(s) connected")
		io.in("" + data.room).emit('usercount', room.length);

		if (room.length == 1) {
			//first to join room!
			roomHistory.set(data.room, [])
			console.log("History", roomHistory.get(data.room))
		} else {
			console.log("History", roomHistory.get(data.room))
			let hist = roomHistory.get(data.room);
			for (let i = 0; i < hist.length; i++) {
				let action = hist[i]
				console.log(action)
				if (action[0] == "addstaff") {
					console.log("executing history addstaff")
					socket.emit(action[0]);
				} else if (action[0] == "addnote") {
					console.log("executing history addnote")
					socket.emit(action[0], action[1].staff, action[1].note);
				}
			}
		}

		socket.on('addstaff', function (data) {
			io.in("" + data.room).emit("addstaff");
			roomHistory.get(data.room).push(["addstaff", data])
			console.log("History", roomHistory.get(data.room))
		})
		socket.on('addnote', function (data) {
			io.in("" + data.room).emit("addnote", data.staff, data.note);
			roomHistory.get(data.room).push(["addnote", data])
			console.log("History", roomHistory.get(data.room))
		})

		socket.on('disconnect', function () {
			io.in("" + data.room).emit('usercount', room.length);
			console.log('User Disconnected')
			if (room.length == 0) {
				// save to database
			}
		});
	})
})

ioserver.listen(3001);

app.listen(PORT, function () {
	console.log('running at localhost: ' + PORT);
});

module.exports = app;