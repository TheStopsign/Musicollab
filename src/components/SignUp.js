//src/components/SignUp.js

import React, { Component } from 'react';
import '../css/SignUp.css';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { validateAll } from 'indicative/validator'
import Logo from '../assetts/logo.svg';
//var validate = require('indicative')

class SignUp extends Component {
	render() {
		if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
			return (
				<div className="SignUp">

					<div className="container-fluid">

						<div className="row align-items-center section">
							<div className="col-3">
								<a href="/home" className="svg">
									<img src={Logo} alt="Logo" height="80px" />
								</a>
							</div>
						</div>
						<div className="d-flex justify-content-center SignUpBox">
							<div className="row rowSignUpBox">
								<div className="col align-items-center colSignUpBox">

									<div className="row justify-content-center">
										<div className="col-xlg SignUpTitle">
											<h3>Sign Up</h3>
										</div>
									</div>

									<div className="row FirstName">
										<input className="form-control"
										type="text"
										name="firstName"
										placeholder="First name"
										value={this.state.firstName}
										onChange={this.handleChange}
										/>
          									<p></p>
									</div>

									<div className="row LastName">
										<input className="form-control"
										type="text"
										name="lastName"
										placeholder="Last name"
										value={this.state.lastName}
										onChange={this.handleChange}
										/>
									</div>

									<div className="row Email">
										<input className="form-control"
										type="text"
										id="email"
										name="email"
										placeholder="Email"
										value={this.state.email}
										onChange={this.handleChange}
										/>
									</div>

									<div className="row Password">
										<input className="form-control"
										type="password"
										name="password"
										placeholder="Password"
										value={this.state.password}
										onChange={this.handleChange}
										/>
									</div>

									<div className="row PasswordConfirm">
										<input className="form-control"
										type="password"
										name="password_confirmation"
										placeholder="Confirm Password"
										value={this.state.password_confirmation}
										onChange={this.handleChange}
										/>
									</div>

									<div className="row justify-content-center">
										<div className="SubmitButton">
											<button
												className="btn btn-primary btn-block"
												onClick={this.handleSubmit}
												type="submit"
											>Submit</button>
										</div>
									</div>

									<p className="text-right toLogin">
										Already registered? <a href="/">Login</a>
									</p>

								</div>
							</div>
						</div>

					</div>

				</div>
			);
		}
	}

	constructor() {
		super()
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			password_confirmation:'',
			errors: {},
			isValidated: false,
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	// sets state to the text typed in the form (aka displays what you typed in the box)
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit(event) {
		console.log('Attempting sign-up');
		console.log(this.state);
		event.preventDefault();

		// Validate user input using indicative package
		// take input data from state
		var valid = false;
		const data = this.state;
		const rules = {
			firstName: 'required|string',
			lastName: 'required|string',
			email: 'required|email',
			password: 'required|string|min:6|confirmed'
		};

		// Custom messages to display on validation error
		const messages = {
			required: 'Please enter {{field}}',
			'firstName.required': 'Please enter a name',
			'lastName.required': 'Please enter a name',
			'email.email': 'The email is invalid',
			'password.confirmed': 'Password does not match',
			'password.min': 'Password must be at least 6 characters'
		};

		// Check each of the fields for errors (left blank, password not match)
		validateAll(data, rules, messages)
			.then(()=>{
				console.log('Successfully VALIDATED');

				// Attempt to add new account to database
				axios.post('/accounts/signup', {
					firstName: this.state.firstName,
					lastName: this.state.lastName,
					email: this.state.email,
					password: this.state.password,
					permissions: []
					})
					.then(response => {
						console.log(response.data)

						if(!response.data.errmsg){
							console.log('successful signup');
							this.setState({ //redirect to login page
								redirectTo: '/log-in'
							})
						}else{
							// Account already exists with email, notify user
							alert(response.data.errmsg)
						}
					}).catch(error => {
						console.log('signup database error ');
					})
			})
			.catch((errors)=>{
				// show errors to user
				const formattedErrors = {};
				let errorResponse = "";

				// errors from form validation
				errors.forEach( error => formattedErrors[error.field] = error.message );
				this.setState({errors: formattedErrors});

				for(const err in formattedErrors){
					errorResponse += formattedErrors[err]+"\n";
				}
				alert(errorResponse);

				console.log(this.state.errors);
			})
	}
}

export default SignUp;
