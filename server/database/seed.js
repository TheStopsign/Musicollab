var seeder = require('mongoose-seed');
var config = require('./config');
let Account = require('../Account/Account.model');
let Permission = require('../Permission/Permission.model');
let Document = require('../Document/Document.model');

// Connect to MongoDB via Mongoose
const seedDB = async () => {
	seeder.connect(config.MONGO_URI, function () {

		// Load Mongoose models
		seeder.loadModels([
			'./server/Account/Account.model.js',
			'./server/Permission/Permission.model.js',
			'./server/Document/Document.model.js'
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

var a1 = new Account({
	firstName: "UserA",
	lastName: "LastName",
	email: "usera@gmail.com",
	password: "passa"
})

var a2 = new Account({
	firstName: "UserB",
	lastName: "LastName",
	email: "userb@gmail.com",
	password: "passb"
})

var a3 = new Account({
	firstName: "UserC",
	lastName: "LastName",
	email: "userc@gmail.com",
	password: "passc"
})

var p1 = new Permission({

})

var p2 = new Permission({

})

var p3 = new Permission({

})

var d1 = new Document({

})

var d2 = new Document({

})

var d3 = new Document({

})

var testAccounts = [a1, a2, a3]
var testPermissions = [p1, p2, p3]
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