//const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Account = require('./Account/Account.model');
const mongoose = require('mongoose');
const config = require('./config')

module.exports = function(passport) {
	// saves user_id as cookie
	passport.serializeUser(function(user, done){
		console.log('*** serializeUser called, user: ')
		console.log(user.firstName, user.lastName)
		console.log('user_id', user._id)
		console.log('---------')
		done(null, { _id: user._id })
	})

	// uses cookie to find the account/user object
	passport.deserializeUser(function(user, done){
		//console.log('DeserializeUser called')
		//console.log(user)

		mongoose.connect(config.MONGO_URI)
		.then(() => {
			Account.findOne({ _id: user._id },(err, user) => {
				if(!user){
					return done(new Error('user not found'))
				}
				console.log('*** Deserialize user, user:')
				console.log(user)
				console.log('--------------')
				done(null, user)		
			}).catch((err) => {
				console.log('DESERIALIZE FINDONE ERROR: ',err);
				done(err);
			}).then(() => {
				mongoose.disconnect()
			})
		}).catch(err =>{
			console.log('Deserialize failed to connect to MongoDB:', err);
		})
	})

	passport.use(new LocalStrategy({usernameField: 'email'}, function(email, password, done){
		//console.log('==========PASSPORT LOGIN STRATEGY=============')
		//console.log('email: ',email, 'password: ',password)

		mongoose.connect(config.MONGO_URI)
		.then(() => {
			// console.log('now finding account to validate login')
			Account.findOne({ email: email }, (err, account) => {
				if (!account) {
					console.log('account not found ERROR')
					return done(null, false, { message: 'Incorrect email' });
				}
				else if (!account.validPassword(password)) {
					console.log('wrong password ERROR')
					return done(null, false, { message: 'Incorrect password' });
				}
				return done(null, account)
			}).then(() => {
				mongoose.disconnect()
			}).catch(err =>{
				console.log('PASSPORT FINDONE ERROR:', err);
			})
		}).catch(err =>{
			console.log('Passport strategy failed to connect to MongoDB:', err);
		})
	}))
}