//client/components/Accounts.js

import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom'

class Accounts extends Component {
	render() {
		return (
			<div className="accountsList">
				<center><h1>Account List</h1></center>
				<table>
					<thead>
						<tr>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Email</th>
							<th>Password</th>
							<th>isOnline</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.accounts.map(function (account) {
								return <tr key={account._id}>
									<td>{account.firstName}</td>
									<td>{account.lastName}</td>
									<td>{account.email}</td>
									<td>{account.password}</td>
									<td>{account.isOnline.toString()}</td>
									<td><Link to={"/accounts/" + account._id}>Edit</Link></td>
								</tr>
							})
						}
					</tbody>
				</table>
			</div >
		);
	}
	constructor(props) {
		super(props);
		this.state = {
			accounts: []
		}
	}
	componentDidMount() {
		this.getAccounts();
	}
	async getAccounts() {
		axios.get('http://localhost:8000/accounts')
			.then(res => {
				this.setState({ accounts: res.data });
			})
			.catch(function (error) {
				console.log(error);
			})
	}
}

export default Accounts;
