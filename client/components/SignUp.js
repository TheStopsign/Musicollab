//client/components/SignUp.js

import React, { Component } from 'react';
import '../css/App.css';
import { Link } from "react-router-dom";

class SignUp extends Component {
	render() {
		return (
			<div className="SignUp">

				<div className="container-fluid">

					<div className="row align-items-center section">
						<div className="col-3">
							<a href="/home" class="svg">
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
									<input type="text" className="form-control" placeholder="First name" />
								</div>

								<div className="row LastName">
									<input type="text" className="form-control" placeholder="Last name" />
								</div>

								<div className="row Email">
									<input type="email" className="form-control" placeholder="Enter email" />
								</div>

								<div className="row Password">
									<input type="password" className="form-control" placeholder="Enter password" />
								</div>

								<div className="row justify-content-center">
									<div className="SubmitButton">
										<Link to="/home" className="btn btn-primary btn-block">Submit</Link>
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

export default SignUp;
