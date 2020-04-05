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
		console.log('---------')
		done(null, { _id: user._id })
	})

	// uses cookie to find the account/user object
	passport.deserializeUser(function(user, done){
		console.log('DeserializeUser called')
		console.log(user)

		mongoose.connect(config.MONGO_URI)
		.then(() => {
			Account.findOne({ _id: user._id },(err, user) => {
				console.log('*** Deserialize user, user:')
				console.log(user)
				console.log('--------------')
				done(null, user)
			}
			).then(() => {
				mongoose.disconnect()
			})
		})
	})

	passport.use(new LocalStrategy({usernameField: 'email'}, function(email, password, done){
		console.log('=======================')
		console.log('email: ',email, 'password: ',password)

		mongoose.connect(config.MONGO_URI)
		.then(() => {
			console.log('now finding account to validate login')
			Account.findOne({ email: email }, (err, account) => {
				if (err) {
					console.log('BIG ERROR: ', err)
					return done(err)
				}
				else if (!account) {
					console.log('account not found error')
					return done(null, false, { message: 'Incorrect email' })
				}
				else if (!account.validPassword(password)) {
					console.log('wrong password error')
					return done(null, false, { message: 'Incorrect password' })
				}
				return done(null, account)
			}).then(() => {
				mongoose.disconnect()
			})
		})
	}))
}