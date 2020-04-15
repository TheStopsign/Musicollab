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

// list of notes in the form {accidental}{note value}{octave}{note length}{dot} ie. nc32f nr03f sb23t
// accidental would be s = sharp, f = flat, or n = natural (need to check key sig before rendering)
// note value would be pitch {a ... g, r} 
// octave is at most {0, ..., 8} but is limited by instrument range
// length would be 32 = whole, 16 = half, ..., or 1 = 32nd
// dot is {f,t} and determines if a note has a dot, this mmultiplies the length by 1.5

var d1 = new Document({
	title: "Test Doc 1",
	notes: [
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
})

var d2 = new Document({
	title: "Test Doc 2",
	notes: [
		"NA400",
		"NA400",
		"NA400",
		"NA400",
		"NA400",
		"NA400",
		"NA400",
		"NA400",
		"NA400",
		"NA400",
		"NA400",
		"NA400",
		"NA400",
		"NA400",
		"NA400",
		"NA400",
		"NA400",
		"NA400",
		"NA400",
		"NA400",
		"NA400",
		"NA400",
		"NA400",
		"NA400",
		"NA400",
		"NA400",
		"NA400",
		"NA400",
		"NA400",
		"NA400",
		"NA400",
		"NA400",
	]
})

var d3 = new Document({
	title: "Test Doc 3",
	notes: []
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