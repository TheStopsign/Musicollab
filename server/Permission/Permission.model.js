const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Document = require('../Document/Document.model');

//Define collection and schema for Permission
let Permission = new Schema({
	document: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Document'
	},
	isOwner: {
		type: Boolean,
		default: false
	},
	canEdit: {
		type: Boolean,
		default: false
	},
	canView: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('Permission', Permission, 'Permission');