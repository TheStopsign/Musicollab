//src/components/Accounts.js

import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

class EditDocument extends Component {
	render() {
		return (
			<div className="EditDocument">

				<div className="row align-items-center head section">
					<div className="col-2">
						<div className="row">
							<div className="col-6 padding-0">
								<h4 className="float-right"> CLEFS:&nbsp; </h4>
							</div>

							<div className="col padding-0">
								<div className="dropdown">
									<select>
										<option value="1">Treble</option>
										<option value="2">Bass</option>
										<option value="3">Alto</option>
										<option value="4">Tenor</option>
									</select>
								</div>
							</div>
						</div>
					</div>

					<div className="col-3">
						<div className="row">
							<div className="col-7 padding-0">
								<h4 className="float-right"> Key Signature:&nbsp; </h4>
							</div>

							<div className="col padding-0">
								<div className="dropdown">
									<select>
										<option value="1">C major</option>
										<option value="2">G major</option>
										<option value="3">D major</option>

									</select>
								</div>
							</div>
						</div>
					</div>

					<div className="col-3">
						<div className="row">
							<div className="col-8 padding-0">
								<h4 className="float-right"> Time Signature:&nbsp; </h4>
							</div>

							<div className="col padding-0">
								<div className="dropdown">
									<select>
										<option value="1">4/4</option>
										<option value="2">3/4</option>
										<option value="3">2/4</option>

									</select>
								</div>
							</div>
						</div>
					</div>

					<div className="col-2">
						<div className="row">
							<div className="col-3 padding-0">
								<h4 className="float-right"> Notes:&nbsp; </h4>
							</div>

							<div className="col padding-0">
								<div className="dropdown">
									<select>
										<option value="1">Whole</option>
										<option value="2">Half</option>
										<option value="3">Quarter</option>
										<option value="4">Eigth</option>
										<option value="5">Sixteenth</option>
										<option value="6">Thirty-Second</option>
									</select>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="main container-fluid">
					<div className="row subMain">
						<div className="col-1 quickbar section">
							<h4> quickbar </h4>
						</div>


						<div className="col document section">
							<input class="inpNotes" id="titlefield" placeholder={this.state.document.title} />
							<button>Update</button>

							<div className="musicsheet">
								<div id='sheet'>
								</div>
							</div>

							<div className="musicsheet">
								<div id='sheet'>
								</div>
							</div>

							<div className="musicsheet">
								<div id='sheet'>
								</div>
							</div>
						</div>

					</div>

					<div className="row section users">
						<div className="col">
							<h1> Owner: </h1>
						</div>
						<div className="col">
							<h1> Current Editors: </h1>
						</div>
						<div className="col">
							<h1> Current Viewers: </h1>
						</div>
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
