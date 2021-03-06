//src/components/Home.js

import React, { Component } from 'react';
import '../css/Home.css';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Logo from '../assetts/logo.svg';
import Profile from '../assetts/profile.jpg';

class Home extends Component {
	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div className="Home">

					<div className="row align-items-center hotBar">
						<div className="col-2">
							<a href="/home" className="svg">
								<img src={Logo} alt="Logo" height="80px" />
							</a>
						</div>

						<div className="col-4 searchBar">
							<input type="text" id="search" name="search" placeholder="Search" />
						</div>
						<div className="col-1"></div>

						<div className="col-1 picCol">
							<img className="float-right pic" src={Profile} alt="prfile picture" />
						</div>

						<div className="col-2 user">
							<ul>
								<li> {this.state.user.firstName} {this.state.user.lastName} </li>
								<li className="userID">{this.state.user.email}</li>
							</ul>
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
							{/* list of documents as links to those documents */}

							<div className="col projects section">
								{this.state.documents.map(function (document) {
									return <div className="documentCard" key={document._id}>
										<Link to={"/documents/" + document._id}><h4>{document.title}</h4></Link>
									</div>
								})}
								<button className="btn btn-primary" onClick={this.newDoc}>+</button>
							</div>
							<div className="col-1 sideFill"></div>
						</div>
					</div>
				</div>
			);
		}

	}
	constructor(props) {
		super(props);
		//console.log(this.props.location)
		this.state = {
			documents: [], //holds user-specific documents
			// user: this.props.location.state.user,
			user: JSON.parse(localStorage.getItem('user')), // User saved in local storage
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
		axios.get("http://localhost:8000/accounts/getDocuments/" + this.state.user._id)
			.then(res => {
				this.setState({ documents: res.data })
				console.log("Docs load successful", this.state.documents)
			})
			.catch(function (err) {
				console.log('Docs load error:', err)
			})

	}
	getDocuments() {
		return this.state.documents
	}
	handleLogout(event) {
		console.log('Attempting logout')

		// Removing saved user status and information
		localStorage.removeItem('user')
		localStorage.removeItem('isLoggedIn')

		axios.get('http://localhost:8000/accounts/logout')
			.then(res => {
				console.log('logout res:', res.data)
				alert("Logging out")
				this.setState({ redirectTo: '/' });
			})
			.catch(function (error) {
				console.log('Logout error')
				console.log(error);
			})
	}
	async newDoc() {
		axios.post('http://localhost:8000/documents/new')
			.then(res => {
				console.log("New document created: ", res.data)
				// Add new document to state to update page
				let newDocs = this.getDocuments()
				newDocs.push(res.data)
				this.setState({ documents: newDocs })

				let permission; // to store new permission object from /new POST
				let doc = res.data;
				// Now create a new permission to represent sharing
				axios.post('http://localhost:8000/permissions/new', {
					document: res.data._id,
					isOwner: true,
					canEdit: true,
					canView: true,
				}).then(res2 => {
					console.log('New permission:', res2.data)
					permission = res2.data;
					let tmpuser = this.state.user
					tmpuser.permissions.push(permission)
					this.setState({ user: tmpuser })
					// Add the new permission_id to the shared user's list of permissions
					axios.post('http://localhost:8000/accounts/newPermission', {
						permission: permission,
						userID: this.state.user._id
					}).then(res3 => {
						console.log('Successfully saved permission to account', res3);
					}).catch(error => {
						console.log('share permission with account error: ', error);
					})
				}).catch(error => {
					console.log('permissions/new error: ', error)
				})
			}).catch(error => {
				console.log('Error creating document:', error)
			})
	}
}

export default Home;
