const express = require('express');
const accountRouter = express.Router();
const mongoose = require('mongoose');
const config = require('../config');

let Account = mongoose.model('Account')

accountRouter.route('/').get(function (req, res) {
	console.log("/accounts GET received")
	mongoose.connect(config.MONGO_URI)
		.then(() => {
			Account.find(function (err, accounts) {
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

accountRouter.route('/:id').get(function (req, res) {
	let id = req.params.id;
	console.log("/accounts/" + id + "GET received")
	mongoose.connect(config.MONGO_URI)
		.then(() => {
			Account.findById(id, function (err, user) {
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

module.exports = accountRouter;