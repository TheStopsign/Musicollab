const express = require('express');
const permissionRouter = express.Router();
const mongoose = require('mongoose');
const config = require('../config');

let Document = require('../Document/Document.model');
let Permission = require('../Permission/Permission.model');
let Account = require('../Account/Account.model');

permissionRouter.route('/:id').get(function (req, res) { //when the server receives a request to the /permissions/PERM_OBJ_ID route
	let id = req.params.id;
	console.log("/permissions/" + id + " GET received")
	mongoose.connect(config.MONGO_URI)
		.then(() => {
			Permission.findById(id, function (err, permission) { //query for specific document
				if (err) {
					res.status(400).json(err);
				} else {
					res.status(200).json(permission);
				}
			}).then(() => {
				mongoose.disconnect()
			})
		})
});

permissionRouter.route('/new').post(function (req, res) {
	console.log("/permissions/new POST received");

	const { document, isOwner, canEdit, canView } = req.body

	mongoose.connect(config.MONGO_URI)
		.then(() => {
			// Account.findOne({ email: email }, function (err, account) {
			// 	if (err) {
			// 		console.log('Account.route.js post error: ', err)
			// 	} else if (account) {
			const newPerm = new Permission({
				document: document,
				isOwner: isOwner,
				canEdit: canEdit,
				canView: canView
			})
			newPerm.save((err, savedPerm) => {
				if (err) res.json(err)
				else {
					res.json(savedPerm)
					// TODO add permission to account
				}
			}).then(() => {
				mongoose.disconnect()
			})
			// }
			// else {
			// 	res.json({ errmsg: "User does not exist" })
			// }
		})
})

module.exports = permissionRouter;