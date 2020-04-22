//src/components/Login.js

import React, { Component } from 'react';
import '../css/Login.css';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import Logo from '../assetts/logo.svg';

class Login extends Component {
	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{
				pathname: this.state.redirectTo,
				state: { user: this.state.user }
			}} />
		} else {
			return (
				<div className="Login">

					{/* <div class="container-fluid"> */}

					<div className="row align-items-center head section">
						<div className="col-3">
							<a href="/home" className="svg">
								<img src={Logo} alt="Logo" height="80px" />
							</a>
						</div>
					</div>

					<div className="d-flex justify-content-center LoginBox">
						<div className="row rowLoginBox">
							<div className="col align-items-center colLoginBox">

								<div className="row justify-content-center">
									<div className="col-xlg SignInTitle">
										<h3>Sign In</h3>
									</div>
								</div>

								<div className="row Email">
									<input className="form-control"
										type="text"
										id="email"
										name="email"
										placeholder="Enter email"
										value={this.state.email}
										onChange={this.handleChange}
									/>
								</div>

								<div className="row Password">
									<input className="form-control"
										type="password"
										name="password"
										placeholder="Enter password"
										value={this.state.password}
										onChange={this.handleChange}
									/>
								</div>

								<div className="row">
									<div className="col-xlg checkbox">

										<div className="custom-control custom-checkbox">
											<input type="checkbox" className="custom-control-input" id="customCheck1" />
											<label className="custom-control-label" htmlFor="customCheck1">Remember Me</label>
										</div>

									</div>

									<div className="col flex-grow"></div>

									<div className="col-xlg SignupButton">
										<Link to="/sign-up" className="btn btn-link btn-sm raised">Sign up</Link>
									</div>
								</div>

								<div className="row justify-content-center">
									<div className="SubmitButton">
										<button
											className="btn btn-primary btn-block"
											onClick={this.handleSubmit}
											type="submit">Submit</button>
									</div>
								</div>
							</div>
							<div className="col-0 v-line"></div>
							<div className="col">
								<div className="row justify-content-center GoogleLogin">
									<h3> Google </h3>
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
			email: '',
			password: '',
			user: {},
			redirectTo: null,
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
		event.preventDefault()
		console.log('login handleSubmit')
		
		axios.post('http://localhost:8000/accounts/login', {
			email: this.state.email,
			password: this.state.password
		})
			.then(res => {
				console.log('login response: ')
				console.log(res.data)
				if (!res.data.errmsg) {
					// save user status and information
					localStorage.setItem('isLoggedIn', true)
					localStorage.setItem('user', JSON.stringify(res.data))
					console.log('Login success, redirecting to /home')
					// update state to redirect to home
					this.setState({
						user: res.data,
						redirectTo: '/home'
					})
				}else{
					alert('Invalid email or password');
					this.setState({
						email: '',
						password: ''
					})
				}
			}).catch(error => {
				console.log('login error: ')
				console.log(error);

			})
	}
}

export default Login;
