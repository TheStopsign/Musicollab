//client/components/Home.js

import React, { Component } from 'react';
import '../css/App.css';
import { Link } from "react-router-dom";

class Home extends Component {
	render() {
		return (
			<div className="Home">

				<div className="row align-items-center head section">
					<div className="col-3">
						<a href="/home" className="svg">
							<object type="image/svg+xml" data="../logo.svg" height="80"></object>
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

				<div className="container-fluid">
					<div className="row">
						<div className="col-2 filters section">
							<div className="row">
								<div className="col">
									<h1> sort by: </h1>
									<ul>
										<li> Name </li>
										<li> Owner </li>
										<li> Last Modified </li>
										<li> Size </li>
										<li> Share Date </li>
										<li> sort 6 </li>
									</ul>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<h1> filters: </h1>
									<ul>
										<li> Owned by me </li>
										<li> Shared with me </li>
										<li> Starred </li>
										<li> Archived </li>
										<li> filter 5 </li>
										<li> filter 6 </li>
									</ul>
								</div>
							</div>
						</div>

						<div className="col projects section">
							<div className="create">

							</div>
						</div>
					</div>
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

export default Home;
