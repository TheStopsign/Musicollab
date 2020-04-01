//src/components/Profile.js

import React, { Component } from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import Logo from '../logo.svg';

class Profile extends Component {
	render() {
		return (
			<div className="Profile">

				<div className="row align-items-center head section">
					<div className="col-3">
						<a href="/home" className="svg">
							<img src={Logo} alt="Logo" height="80px" />
						</a>
					</div>

					<div className="col-6 searchBar">
						<input type="text" id="search" name="search" placeholder="Search" />
					</div>

					<div className="col-1">
						<img className="float-right pic" src="profile.jpg" alt="prfile picture" />
					</div>

					<div className="col-2 user">
						<ul>
							<li><a href="/profile"> Username</a></li>
							<li className="userID">User ID</li>
						</ul>
					</div>
				</div>
				<div className="main container-fluid">

				</div>
				<div className="container-fluid">
					<div className="row footer section">
							Musicollab is a 2020 SD&D project
					</div>
				</div>
			</div>
		);
	}
}

export default Profile;
