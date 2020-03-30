var seeder = require('mongoose-seed');
var config = require('./config');
let Account = require('./Account/Account.model');
let Permission = require('./Permission/Permission.model');
let Document = require('./Document/Document.model');

// Connect to MongoDB via Mongoose
const seedDB = async () => {
	seeder.connect(config.MONGO_URI, function () {

		// Load Mongoose models
		seeder.loadModels([
			'./Account/Account.model.js',
			'./Permission/Permission.model.js',
			'./Document/Document.model.js'
		]);

		// Clear specified collections
		seeder.clearModels(['Account', 'Permission', 'Document'], function () {

			// Callback to populate DB once collections have been cleared
			seeder.populateModels(data, function (err, done) {
				if (err) {
					return console.log("seed err", err)
				}
				if (done) {
					return console.log("seed finished", done)
				}
				seeder.disconnect()
			});

		});
	});
}

var d1 = new Document({
	title: "Test Doc 1",
	musicData: ""
})

var d2 = new Document({
	title: "Test Doc 2",
	musicData: ""
})

var d3 = new Document({
	title: "Test Doc 3",
	musicData: ""
})

var p1 = new Permission({
	document: d1,
	isOwner: true,
	canEdit: true,
	canView: true
})

var p2 = new Permission({
	document: d1,
	isOwner: false,
	canEdit: true,
	canView: true
})

var p3 = new Permission({
	document: d1,
	isOwner: false,
	canEdit: false,
	canView: true
})

var p4 = new Permission({
	document: d1,
	isOwner: false,
	canEdit: false,
	canView: false
})

var a1 = new Account({
	firstName: "UserA",
	lastName: "LastName",
	email: "usera@gmail.com",
	password: "passa",
	permissions: [
		p1
	]
})

var a2 = new Account({
	firstName: "UserB",
	lastName: "LastName",
	email: "userb@gmail.com",
	password: "passb",
	permissions: [
		p2
	]
})

var a3 = new Account({
	firstName: "UserC",
	lastName: "LastName",
	email: "userc@gmail.com",
	password: "passc",
	permissions: [
		p3
	]
})

var a4 = new Account({
	firstName: "UserD",
	lastName: "LastName",
	email: "userd@gmail.com",
	password: "passd",
	permissions: [
		p4
	]
})

var testAccounts = [a1, a2, a3, a4]
var testPermissions = [p1, p2, p3, p4]
var testDocuments = [d1, d2, d3]

const data = [
	{
		'model': 'Account',
		'documents': testAccounts
	}, {
		'model': 'Permission',
		'documents': testPermissions
	}, {
		'model': 'Document',
		'documents': testDocuments
	}
];

module.exports = seedDB;