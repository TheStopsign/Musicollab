const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define collection and schema for Permission
let Document = new Schema({
	musicData: {
		type: String,
		default: ""
	}
});

module.exports = mongoose.model('Document', Document);