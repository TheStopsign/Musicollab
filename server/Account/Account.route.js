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

accountRouter.route('/user/:id').get(function (req, res) { //when the server receives a request to the /accounts/user/ACCOUNT_OBJ_ID route
	let id = req.params.id;
	console.log("/accounts/user/" + id + " GET received");
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

// Server receives a request to find an email (AKA account) in the DB
accountRouter.route('/findEmail/:email').get(function (req, res) {
	let email = req.params.email;
	console.log('/accounts/findEmail/'+ email + " GET received");

	mongoose.connect(config.MONGO_URI)
			.then(() => {
				// console.log('now finding account to validate login')
				Account.findOne({ email: email }, (err, account) => {
					if (!account) {
						console.log('account not found')
						res.status(400)
					}else{
						console.log('account found, id:', account._id)
						res.status(200).json(account._id)
					}		
				}).then(() => {
					mongoose.disconnect()
				}).catch(err =>{
					console.log('FINDEMAIL ERROR:', err);
				})
			}).catch(err =>{
				console.log('accounts/findEmail failed to connect to MongoDB:', err);
			})
});

// Shares a document by adding it to the given user's permissions
accountRouter.route('/share').post(function (req, res) {
	console.log("/accounts/share GET received");

	const { permission, sharedUser } = req.body;

	mongoose.connect(config.MONGO_URI)
		.then(() => {
			Account.findById(sharedUser, (err, user) => {
				user.permissions.push(permission._id) // add permission to user's array of permissions
				user.save(); // save changes to the database
			}).then(() =>{
				mongoose.disconnect();
			})
		}).catch(err =>{
			console.log('accounts/share failed to connect to MongoDB:', err);
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
			//console.log('Finding the account..')
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
			    	//console.log('Making account with email: ', email)
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
		}).catch(err =>{
			console.log('Signup failed to connect to MongoDB:', err);
		})

});

// ================= LOGIN ===========================
accountRouter.post('/login', passport.authenticate('local', { failureFlash: true}),(req, res) => {
        console.log('Passport login authentication result:', req.user);
        // After login, req.user contains the account
        res.status(200).json(req.user)
    }
);

// =================== LOG OUT =====================
accountRouter.get('/logout', (req, res, next) => {
	console.log('/account/logout GET received, session:', req.session);
	//console.log('user to be logged out:', req.user)

	if(req.session) {
		// delete the session
		req.session.destroy(function(err){
			if(err){
				console.log('session destroy error:', err)
				return next(err);
			}
		});
		console.log('Session closed successfully');
		mongoose.disconnect(); // disconnect any active database connections
		return res.send({ success: true });
	}
});

accountRouter.get('/data', (req, res, next) => {
	console.log('/account/data GET received, session:', req.session);
	// if user logged in successfully with passport, req.user always contains user object
	res.json(req.user);
})

module.exports = accountRouter;