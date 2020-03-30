//client/components/Accounts.js

import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import MusicRender from './MusicRender';

class EditDocument extends Component {
	render() {
		// syntax: C#5/q means a C-sharp in the 5th octave as a quarter note
		// All notes require octave
		// Notes must match time signature (4/4 only for now)
		// the quarter note is applied to subsequent notes
		const notes = 'C#5/q, B4, A4/8, B4, C#5, D4';

		return (
			<div className="document">
				<div className="account">
					<h1>Edit Document</h1>
					<input id="titlefield" placeholder={this.state.document.title} />
					<button>Update</button>
				</div>

				<div className="musicsheet">							
					<div id={'sheet'}>
					<MusicRender notes={notes} />
					</div>				
				</div>
			</div>
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
