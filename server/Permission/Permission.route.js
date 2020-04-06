const express = require('express');
const permissionRouter = express.Router();
const mongoose = require('mongoose');
const config = require('../config');

let Document = require('../Document/Document.model');
let Permission = require('../Permission/Permission.model');
let Account = require('../Account/Account.model');

permissionRouter.route('/new').post(function (req, res) {
	console.log("/permissions/new POST received");

	const { document, isOwner, canEdit, canView, email } = req.body

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