//src/components/Accounts.js

import React, { Component } from 'react';
import '../css/EditDocument.css';
import axios from 'axios';
import Staff from './Staff';
import EighthNote from './EighthNote';
import io from 'socket.io-client';

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
										{/* <center> */}
										<button id="addStaffBtn" className="btn">+</button>
										{/* </center> */}
									</div>
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
							<h1> Current Viewers: {this.state.usercount}</h1>
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
			document: {}, //holds the document info
			socket: {},
			usercount: 0
		}
	}
	componentDidMount() {
		this.joinEditSession()
			.then(() => {
				document.getElementById("addStaffBtn").addEventListener("click", () => {
					this.state.socket.emit('addstaff', { room: "" + this.state.document._id });
				})
			}); //when page loads, first get the document info
	}
	async joinEditSession() {
		axios.get(`http://localhost:8000/documents/` + this.props.match.params.id) //make a GET request to the server
			.then(res => {
				this.setState({ document: res.data }); //handle the response payload
				const sock = io.connect("http://localhost:3001");
				sock.on('connect', () => {
					console.log(sock.id);
					sock.emit("joinsession", { room: "" + this.state.document._id });
				});
				sock.on('addstaff', () => {
					this.addStaff()
				});
				sock.on('usercount', (count) => {
					this.setState({ usercount: count })
				});
				this.setState({ socket: sock })
			})
			.catch(function (error) {
				console.log(error);
			})
	}
	getSocket() {
		return this.state.socket
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
