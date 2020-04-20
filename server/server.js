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
	let updated_notes = roomData.get(docID).notes;
	let hist = roomHistory.get(docID);
	for (let i = 0; i < hist.length; i++) {
		let action = hist[i]
		if (action[0] == "addstaff") {
			updated_notes = updated_notes.concat(Array(32).fill("NR450"))
		} else if (action[0] == "addnote") {
			let staff_offset = action[1].staff * 32
			let note_offset = action[1].note.loc
			let n = 0
			let localIndex = 0
			while (n != note_offset) {
				localIndex += 2 ** (parseInt(updated_notes[staff_offset + localIndex][3]))
				console.log(localIndex)
				n++;
			}
			let len = parseInt(action[1].note.noteLength)
			toadd = "N" + action[1].note.pitch + "4" + Math.log2(len) + "0";
			let j = 0
			while (j < len) {
				updated_notes[staff_offset + localIndex + j] = toadd
				j++
			}
			console.log(updated_notes)
			//FILL IN DYNAMICALLY ADDED NOTES
		}
	}
	let updated_doc = {
		title: roomData.get(docID).title,
		notes: updated_notes
	}
	axios.post(`http://localhost:8000/documents/update/` + docID, { updated_doc })
		.then(res => {
			console.log("Successfully updated document")
			roomHistory.delete(docID)
			roomData.delete(docID)
			console.log("History cleared in " + docID)
		})
		.catch(function (error) {
			console.log(error);
		})
}

var roomHistory = new Map()
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
			roomHistory.set(data.room, [])
			roomData.set(data.room, data.document)
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