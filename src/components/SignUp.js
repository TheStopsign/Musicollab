//src/components/SignUp.js

import React, { Component } from 'react';
import '../App.css';
import { Redirect } from "react-router-dom";
import axios from 'axios';

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
									<object type="image/svg+xml" data="../logo.svg" height="80"></object>
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
										Already registered <a href="/">Login?</a>
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
		console.log('sign-up handleSubmit, email: ')
		console.log(this.state.email)
		event.preventDefault()

		//request to server to add a new account
		axios.post('/accounts/signup', {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			password: this.state.password,
			permissions: []
		})
			.then(response => {
				console.log(response.data)
				if (!response.data.errmsg) {
					console.log('successful signup')
					this.setState({ //redirect to login page
						redirectTo: '/log-in'
					})
				} else {
					console.log('error: email already used')
					alert("Email already in use");
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}
}

export default SignUp;
