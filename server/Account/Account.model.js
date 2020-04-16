const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

let Permission = require('../Permission/Permission.model');

//Define collection and schema for Account
let Account = new Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	isOnline: {
		type: Boolean,
		default: false
	},
	permissions: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Permission'
	}]
});

// hash password
Account.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

// validate password
Account.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
}

// Hash the password before saving to database 
Account.pre('save', function (next) {
	if (!this.password) {
		console.log('Account.model.js =======NO PASSWORD PROVIDED=======')
		next()
	} else {
		console.log('Account.model.js hashing password');
		
		this.password = this.generateHash(this.password)
		next()
	}
})

module.exports = mongoose.model('Account', Account, 'Account');