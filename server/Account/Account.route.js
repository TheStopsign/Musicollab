const express = require('express');
const accountRouter = express.Router();
const mongoose = require('mongoose');
const config = require('../config');
const passport = require('passport')
require('../passport-config');

let Account = mongoose.model('Account')

accountRouter.route('/').get(function (req, res) { //when the server receives a request to the /accounts route
	console.log("/accounts GET received")
	mongoose.connect(config.MONGO_URI)
		.then(() => {
			Account.find(function (err, accounts) { //query for all accounts
				if (err) {
					console.log("ERROR!");
					res.status(400).json(err);
				} else {
					console.log("SUCCESS!");
					res.status(200).json(accounts);
				}
			}).then(() => {
				mongoose.disconnect()
			})
		})
});

accountRouter.route('/:id').get(function (req, res) { //when the server receives a request to the /accounts/ACCOUNT_OBJ_ID route
	let id = req.params.id;
	console.log("/accounts/" + id + "GET received")
	mongoose.connect(config.MONGO_URI)
		.then(() => {
			Account.findById(id, function (err, user) { //query for specific account
				if (err) {
					res.status(400).json(err);
				} else {
					res.status(200).json(user);
				}
			}).then(() => {
				mongoose.disconnect()
			})
		})
});


// ============== SIGN UP ======================
accountRouter.route('/signup').post(function (req, res){
	console.log("/accounts/signup POST received");

	const { firstName, lastName, email, password, permissions } = req.body

	// Validate info and add to database
    mongoose.connect(config.MONGO_URI)
		.then(() => {
			// Check if account already exists w/ email
			console.log('we findin the account')
			Account.findOne({ email: email }, function(err, account){
			    if (err) {
			        console.log('Account.route.js post error: ', err)
			    } else if (account) {
			        res.json({
			            errmsg: `Sorry, already an account with the email: ${email}`
			        })
			    }
			    // Account is new, add to database
			    else {
			    	console.log('we making the account now bois')
			        const newAcc = new Account({
			            firstName: firstName,
			            lastName: lastName,
			            email: email,
			            password: password,
			            permissions: permissions
			        })
			        newAcc.save((err, savedAcc) => {
			            if (err) return res.json(err)
			            res.json(savedAcc)
			        })
			    }
    		}).then(() => {
				mongoose.disconnect()
    		})
		})

});

// ================= LOGIN ===========================
accountRouter.post('/login', passport.authenticate('local', { failureFlash: true}),(req, res) => {
        console.log('SUCCESS logged in', req.user._id);
        res.status(200).json(req.user)
    }
);

module.exports = accountRouter;