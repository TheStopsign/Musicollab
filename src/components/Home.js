//src/components/Home.js

import React, { Component } from 'react';
import '../App.css';
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import Logo from '../logo.svg';

class Home extends Component {
	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
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
							<div className="LogoutButton">
								<button
									className="btn btn-primary btn-block"
									onClick={this.handleLogout}
									type="logout"
								>Logout</button>
							</div>
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
								{this.state.documents.map(function (document) {
									return <div className="documentCard" key={document._id}>
										<Link to={"/documents/" + document._id}><h4>{document.title}</h4></Link>
									</div>
								})}
								<button className="btn btn-primary" onClick={this.newDoc}>+</button>
							</div>
						</div>
					</div>

					<div className="container-fluid">
						<footer className="footer section">
							Musicollab is a 2020 SD&D project
	        	</footer>
					</div>
				</div>
			);
		}

	}
	constructor(props) {
		super(props);
		console.log(this.props.location)
		this.state = {
			documents: [], //holds all the documents data
			user: this.props.location.state.user, //passed from user login sessions
			redirectTo: null
		}
		this.handleLogout = this.handleLogout.bind(this);
		this.newDoc = this.newDoc.bind(this);
		this.loadDocuments = this.loadDocuments.bind(this);
	}
	componentDidMount() {
		this.loadDocuments(); //first, get the document data
	}

	async loadDocuments() {
		// axios.get('http://localhost:8000/documents') //make GET request to server
		// 	.then(res => {
		// 		this.setState({ documents: res.data }); //handle response payload
		// 	})
		// 	.catch(function (error) {
		// 		console.log(error);
		// 	})
		let docs = []
		//for each permission
		for (let i = 0; i < this.state.user.permissions.length; i++) {
			axios.get("http://localhost:8000/permissions/" + this.state.user.permissions[i])
				.then(res => {
					let perm = res.data;
					console.log(res)
					//get document from permission object
					axios.get("http://localhost:8000/documents/" + perm.document)
						.then(res2 => {
							docs.push(res2.data)
							this.setState({ documents: docs })
						})
						.catch(function (err) {
							console.log(err)
						})
				})
				.catch(function (err) {
					console.log(err)
				})
		}
	}
	getDocuments() {
		return this.state.documents
	}
	handleLogout(event) {
		console.log('Attempting logout')

		axios.get('http://localhost:8000/accounts/logout')
			.then(res => {
				console.log('logout res:', res.data)
				this.setState({ redirectTo: '/' });
			})
			.catch(function (error) {
				console.log('Logout error')
				console.log(error);
			})
	}
	async newDoc() {
		axios.post('http://localhost:8000/documents/new')
			.then(response => {
				console.log(response.data)
				let newDocs = this.getDocuments()
				newDocs.push(response.data)
				this.setState({ documents: newDocs })
			}).catch(error => {
				console.log('Error creating document')
				console.log(error)
			})
	}
}

export default Home;
