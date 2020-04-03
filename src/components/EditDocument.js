//src/components/Accounts.js

import React, { Component } from 'react';
import '../css/EditDocument.css';
import axios from 'axios';
import Staff from './Staff';
import EighthNote from './EighthNote';

class EditDocument extends Component {
	render() {
		return (
			<div className="document">
				<h1>Edit Document</h1>
				<div className="musicsheet">
					<div className='sheet'>
						<center>
							<h1 className="doc_title">{this.state.document.title}</h1>
						</center>
						{
							this.state.staffs.map(function (staff) {
								return staff.render()
							})
						}
						<div className="addStaffBtnContainer">
							<center>
								<button id="addStaffBtn" className="btn">+</button>
							</center>
						</div>
					</div>
				</div>
			</div>
		);
	}
	constructor(props) {
		super(props);
		this.state = {
			staffs: [],
			document: {} //holds the document info
		}
	}
	componentDidMount() {
		this.joinEditSession()
			.then(() => {
				document.getElementById("addStaffBtn").addEventListener("click", () => { this.addStaff() })
				this.addStaff()
				this.addStaff()
				this.addStaff()
				this.getStaff(2).addNote(new EighthNote({ note: "A" }))
				this.getStaff(2).addNote(new EighthNote({ note: "D" }))
				this.getStaff(2).addNote(new EighthNote({ note: "A" }))
				this.getStaff(2).addNote(new EighthNote({ note: "A" }))
				this.getStaff(2).addNote(new EighthNote({ note: "A" }))
				this.getStaff(2).addNote(new EighthNote({ note: "A" }))
				this.getStaff(2).addNote(new EighthNote({ note: "A" }))
				this.getStaff(2).addNote(new EighthNote({ note: "A" }))
				this.getStaff(2).addNote(new EighthNote({ note: "A" }))
			}); //when page loads, first get the document info
	}
	async joinEditSession() {
		axios.get(`http://localhost:8000/documents/` + this.props.match.params.id) //make a GET request to the server
			.then(res => {
				this.setState({ document: res.data }); //handle the response payload
			})
			.catch(function (error) {
				console.log(error);
			})
	}
	addStaff() {
		let nextStaffs = this.state.staffs
		nextStaffs.push(new Staff())
		this.setState({ staffs: nextStaffs })
	}
	getStaff(i) {
		return this.state.staffs[i]
	}
}

export default EditDocument;
