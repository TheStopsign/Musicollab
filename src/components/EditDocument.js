//client/components/Accounts.js

import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

class EditDocument extends Component {
	render() {
		return (
			<div className="account">
				<h1>Edit Document</h1>
				<input id="titlefield" placeholder={this.state.document.title} />
				<button>Update</button>
			</div >
		);
	}
	constructor(props) {
		super(props);
		this.state = {
			document: {}
		}
	}
	componentDidMount() {
		this.getDocument();
	}
	async getDocument() {
		axios.get(`http://localhost:8000/documents/` + this.props.match.params.id)
			.then(res => {
				this.setState({ document: res.data });
			})
			.catch(function (error) {
				console.log(error);
			})
	}
}

export default EditDocument;
