const express = require('express');
const accountRouter = express.Router();

let Account = require('./Account.model');

accountRouter.get('/', function (req, res) {
	res.render('index')
});

accountRouter.route('/').get(function (req, res) {
	Account.find(function (err, accounts) {
		if (err) {
			res.status(400).json(err);
		} else {
			res.status(200).json(accounts);
		}
	})
})

module.exports = accountRouter;