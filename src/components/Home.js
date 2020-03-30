//client/components/Home.js

import React, { Component } from 'react';
import '../App.css';
import axios from 'axios'
import { Link } from 'react-router-dom'
import Logo from '../logo.svg';

class Home extends Component {
	render() {
		return (
			<div className="Home">

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
								{this.state.documents.map(function (document) {
									return <div className="documentCard" key={document._id}>
										<Link to={"/documents/" + document._id}><h4>{document.title}</h4></Link>
									</div>
								})}
							</div>
						</div>
					</div>
				</div>


				<div className="container-fluid">

					<div className="row footer section">
						Musicollab is a 2020 SD&D project
          			</div>
				</div>
			</div >
		);
	}
	constructor(props) {
		super(props);
		this.state = {
			documents: []
		}
	}
	componentDidMount() {
		this.getDocuments();
	}
	async getDocuments() {
		axios.get('http://localhost:8000/documents')
			.then(res => {
				this.setState({ documents: res.data });
			})
			.catch(function (error) {
				console.log(error);
			})
	}
}

export default Home;
