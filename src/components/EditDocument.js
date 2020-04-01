//src/components/Accounts.js

import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Staff from './Staff';

class EditDocument extends Component {
	render() {
		return (
			<div className="document">
				<h1>Edit Document</h1>
				<input id="titlefield" placeholder={this.state.document.title} />
				<button>Update</button>

				<div className="musicsheet">
					<div id='sheet'>
						<Staff />
						<Staff />
					</div>
				</div>
			</div>
		);
	}
	constructor(props) {
		super(props);
		this.state = {
			// syntax: C#5/q means a C-sharp in the 5th octave as a quarter note
			// All notes require octave
			// Notes must match time signature (4/4 only for now)
			// the quarter note is applied to subsequent notes
			notes: 'C#5/q, B4, A4/8, B4, C#5, D4',
			document: {} //holds the document info
		}
	}
	componentDidMount() {
		this.getDocument(); //when page loads, first get the document info
	}
	async getDocument() {
		axios.get(`http://localhost:8000/documents/` + this.props.match.params.id) //make a GET request to the server
			.then(res => {
				this.setState({ document: res.data }); //handle the response payload
			})
			.catch(function (error) {
				console.log(error);
			})
	}
}

export default EditDocument;
