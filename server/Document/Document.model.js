const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define collection and schema for Permission
let Document = new Schema({
	title: {
		type: String,
		default: "Untitled Document"
	},
	history: {
		type: Array,
		default: [

		]
	}
});

module.exports = mongoose.model('Document', Document, 'Document');