const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define collection and schema for Permission
let Document = new Schema({
	title: {
		type: String,
		default: "Untitled Document"
	},
	notes: {
		type: Array,
		default: [
			"NR450",
			"NR450",
			"NR450",
			"NR450",
			"NR450",
			"NR450",
			"NR450",
			"NR450",
			"NR450",
			"NR450",
			"NR450",
			"NR450",
			"NR450",
			"NR450",
			"NR450",
			"NR450",
			"NR450",
			"NR450",
			"NR450",
			"NR450",
			"NR450",
			"NR450",
			"NR450",
			"NR450",
			"NR450",
			"NR450",
			"NR450",
			"NR450",
			"NR450",
			"NR450",
			"NR450",
			"NR450",
		]
	}
});

module.exports = mongoose.model('Document', Document, 'Document');