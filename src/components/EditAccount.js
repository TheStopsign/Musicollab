//client/components/Accounts.js

import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

class EditAccount extends Component {
	render() {
		return (
			<div className="account">
				<h1>Edit Account</h1>
				<input id="firstnamefield" placeholder={this.state.account.firstName} />
				<input id="lastnamefield" placeholder={this.state.account.lastName} />
				<input id="email" placeholder={this.state.account.email} />
				<input id="password" placeholder={this.state.account.password} />
				<button>Update</button>
			</div >
		);
	}
	constructor(props) {
		super(props);
		this.state = {
			account: {}
		}
	}
	componentDidMount() {
		this.getAccount();
	}
	async getAccount() {
		axios.get(`http://localhost:8000/accounts/` + this.props.match.params.id)
			.then(res => {
				this.setState({ account: res.data });
			})
			.catch(function (error) {
				console.log(error);
			})
	}
}

export default EditAccount;
