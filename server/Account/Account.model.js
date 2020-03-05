const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Permission = require('../Permission/Permission.model');

//Define collection and schema for Account
let Account = new Schema({
	first_name: String,
	last_name: String,
	email: String,
	password: String,
	isOnline: {
		type: Boolean,
		default: false
	},
	permissions: [{
		permission: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Permission'
		}
	}]
});

module.exports = mongoose.model('Account', Account);