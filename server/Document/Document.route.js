const express = require('express');
const documentRouter = express.Router();
const mongoose = require('mongoose');
const config = require('../config');

let Document = require('../Document/Document.model');
let Permission = require('../Permission/Permission.model');

documentRouter.route('/').get(function (req, res) { //when the server receives a request to the /documents route
	console.log("/documents GET received")
	mongoose.connect(config.MONGO_URI)
		.then(() => {
			Document.find(function (err, accounts) { //query for all documents
				if (err) {
					console.log("DOCUMENT GET ERROR!");
					res.status(400).json(err);
				} else {
					console.log("SUCCESS!");
					res.status(200).json(accounts);
				}
			}).then(() => {
				mongoose.disconnect()
			})
		})
});

documentRouter.route('/:id').get(function (req, res) { //when the server receives a request to the /documents/DOC_OBJ_ID route
	let id = req.params.id;
	console.log("/documents/" + id + " GET received")
	mongoose.connect(config.MONGO_URI)
		.then(() => {
			Document.findById(id, function (err, user) { //query for specific document
				if (err) {
					res.status(400).json(err);
				} else {
					res.status(200).json(user);
				}
			}).then(() => {
				mongoose.disconnect()
			})
		})
});

documentRouter.route('/new').post(function (req, res) {
	console.log("/documents/new POST received");

	// Create new doc and add to database
	mongoose.connect(config.MONGO_URI)
		.then(() => {
			var newDoc = new Document()
			newDoc.save((err, savedDoc) => {
				if (err) res.json(err)
				else res.json(savedDoc)
			}).then(() => {
				mongoose.disconnect()
			})
		})
});

module.exports = documentRouter;