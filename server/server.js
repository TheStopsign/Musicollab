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


const session = require('express-session');

const axios = require('axios');

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

app.use(cors());
//app.use('/', router);
app.use('/accounts', accountRouter); //backend API
app.use('/documents', documentRouter); //backend API
app.use('/permissions', permissionRouter); //backend API

app.set('view engine', 'html');
app.set('views', path.join(__dirname, '../public'));
app.engine('html', require('ejs').renderFile);

var socketio = require('socket.io');
var ioserver = require('http').createServer(app);
var allowedOrigins = "http://localhost:* http://127.0.0.1:*";

var io = socketio(ioserver, {
	origins: allowedOrigins //localhost testing
});

function updateFromHistory(docID) {
	let updated_doc = {
		title: roomData.get(docID).title,
		history: roomData.get(docID).history
	}
	axios.post(`http://localhost:8000/documents/update/` + docID, { updated_doc })
		.then(res => {
			console.log("Successfully updated document")
			roomData.delete(docID)
			console.log("History cleared in " + docID)
		})
		.catch(function (error) {
			console.log(error);
		})
}

var roomData = new Map()

io.on('connection', function (socket) {
	console.log("User connected")
	socket.on('joinsession', function (data) {
		console.log("\tjoining session " + data.room)
		socket.join(data.room); //set client to specific document
		var room = io.sockets.adapter.rooms[data.room];
		console.log("\t" + room.length + " user(s) connected")
		io.in("" + data.room).emit('usercount', room.length); //update clients' information

		if (room.length == 1) {
			//first to join room!
			roomData.set(data.room, data.document)
		}
		// let hist = roomData.get(data.room).history;
		// console.log("\tHistory", hist)
		// for (let i = 0; i < hist.length; i++) {
		// 	let action = hist[i]
		// 	console.log(action)
		// 	if (action[0] == "addstaff") {
		// 		console.log("executing history addstaff")
		// 		socket.emit(action[0]);
		// 	} else if (action[0] == "addinstrument") {
		// 		console.log("executing history addinstrument")
		// 		socket.emit(action[0], action[1].instrument);
		// 	} else if (action[0] == "addnote") {
		// 		console.log("executing history addnote")
		// 		socket.emit(action[0], action[1].staff, action[1].note, action[1].instrument);
		// 	}
		// }

		socket.on('addstaff', function (data) {
			io.in("" + data.room).emit("addstaff");
			roomData.get(data.room).history.push(["addstaff", data])
			console.log("History", roomData.get(data.room).history)
		})
		socket.on('addinstrument', function (data) {
			io.in("" + data.room).emit("addinstrument", data.instrument);
			roomData.get(data.room).history.push(["addinstrument", data])
			console.log("History", roomData.get(data.room).history)
		})
		socket.on('addnote', function (data) {
			io.in("" + data.room).emit("addnote", data.staff, data.note);
			roomData.get(data.room).history.push(["addnote", data])
			console.log("History", roomData.get(data.room).history)
		})

		socket.on('disconnect', function () {
			io.in("" + data.room).emit('usercount', room.length);
			console.log('User disconnected from ' + data.room)
			if (room.length == 0) {
				updateFromHistory(data.room)
			}
		});
	})
})

ioserver.listen(3001); //serparate listener

app.listen(PORT, function () {
	console.log('running at localhost: ' + PORT);
});

module.exports = app;
