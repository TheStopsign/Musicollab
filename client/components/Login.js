//client/components/Login.js

import React, { Component } from 'react';
import '../css/App.css';
import { BrowserRouter as Link } from "react-router-dom";

class Login extends Component {
	render() {
		return (
			<div className="Login">

				{/* <div class="container-fluid"> */}

				<div className="row align-items-center head section">
					<div className="col-3 title">
						<h1>Musicollab</h1>
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
								<input type="email" className="form-control concave" placeholder="Enter email" />
							</div>

							<div className="row Password">
								<input type="password" className="form-control concave" placeholder="Enter password" />
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
									<Link to="/home" className="btn btn-primary btn-block">Submit</Link>
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

				{/* </div> */}

			</div>
		);
	}
}

export default Login;
