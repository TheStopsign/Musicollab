const express = require('express');
const documentRouter = express.Router();
const mongoose = require('mongoose');
const config = require('../config');

let Document = mongoose.model('Document')

documentRouter.route('/').get(function (req, res) {
	console.log("/documents GET received")
	mongoose.connect(config.MONGO_URI)
		.then(() => {
			Document.find(function (err, accounts) {
				if (err) {
					console.log("ERROR!");
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

documentRouter.route('/:id').get(function (req, res) {
	let id = req.params.id;
	console.log("/documents/" + id + "GET received")
	mongoose.connect(config.MONGO_URI)
		.then(() => {
			Document.findById(id, function (err, user) {
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

module.exports = documentRouter;