//src/components/Accounts.js

import React, { Component } from 'react';
import '../css/EditDocument.css';
import axios from 'axios';
import io from 'socket.io-client';
import Staff from './Staff';
import NoteTB from './noteToolbar';

const notetb = new NoteTB()

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


					<div className="col padding-0">

						<div className="noteBar" id="noteBar">
							{
								notetb.render()
							}
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
										<button id="addStaffBtn" className="btn">+</button>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>

				<div className="container-fluid" style={{ position: "sticky", bottom: 0 }}>
					<div className="row section footer users">
						<div className="col">
							<h1> Owner: </h1>
						</div>
						<div className="col">
							<h1> Current Editors: </h1>
						</div>
						<div className="col">
							<h1> Current Viewers: {this.state.usercount}</h1>
						</div>
						<div className="col">
							<button className="btn btn-primary" onClick={this.shareDoc}> Share</button>
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
			selectedNote: 0,
			usercount: 0,
			noteCount: 32
		}
		this.shareDoc = this.shareDoc.bind(this)
	}
	componentDidMount() {
		this.joinEditSession()
			.then(() => {
				document.getElementById("addStaffBtn").addEventListener("click", () => {
					this.state.socket.emit('addstaff', { room: "" + this.state.document._id });
				})

				var docInfo = this;
				document.addEventListener('click', (e) => {
					//find path to current element
					let path = [e.target];
					let elem = e.target;
					for (var i = 0; i < 3; i++) {
						path.push(elem.parentElement);
						elem = elem.parentElement;
					}
					//use path to check if current element is a note
					if (path[1].classList[0] == "note") {

						// if current note is on the toolbar at the top, select it
						if (path[2].id == "ntb" || path[3].id == "ntb") {
							if (this.state.selectedNote != 0) {
								this.state.selectedNote.className = this.state.selectedNote.className.slice(0, -8);
							}
							path[1].classList.add("selected");
							this.state.selectedNote = path[1];

						}
						//otherwise change current note value using selected note
						else {
							//gets the currently selected notelength from the dropdown menu
							var noteSelection = this.state.selectedNote.id;

							//gets the newNote information and creates it
							var measure = Number(e.target.classList[1].slice(8));
							var location = Number(e.target.classList[2].slice(9));
							var newPitch = docInfo.getPitch(measure);

							var newNote = { pitch: newPitch, noteLength: noteSelection, loc: location }

							this.state.socket.emit('addnote', { room: this.state.document._id, staff: measure, note: newNote });
						}
					}
				});
				this.setState({ staffs: docInfo.state.staffs })
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
				sock.on('addnote', (measure, newNote) => {
					console.log("Received addNote", newNote)
					this.addNote(measure, newNote.pitch, newNote.noteLength, newNote.loc)
				})
				this.setState({ socket: sock })
			})
			.catch(function (error) {
				console.log(error);
			})
	}
	addNote(measure, newPitch, noteSelection, location) {
		//adds note to the measure and updates render
		let newNote = this.getStaff(measure).makeNote(newPitch, noteSelection, measure, location);
		console.log(newNote)
		this.getStaff(measure).addNote(newNote)
		this.setState({ saffs: this.state.staffs })
	}
	getPitch(measure) {
		//Getting pitch based on mouse x,y (WIP)
		/*
		var el = this.getStaff(measure);

		// var posXY = el.getBoundingClientRect();

		//variables to store the topleft position of the measure
		var xPos = 0;
  	var yPos = 0;

	  while (el) {
	    if (el.tagName == "BODY") {
	      // deal with browser quirks with body/window/document and page scroll
	      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
	      var yScroll = el.scrollTop || document.documentElement.scrollTop;

	      xPos += (el.offsetLeft - xScroll + el.clientLeft);
	      yPos += (el.offsetTop - yScroll + el.clientTop);
	    }
	    else {
	      // for all other non-BODY elements
	      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
	      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
	    }

	    el = el.offsetParent;
	  }
		alert("x: " + xPos+ ", y: " + yPos);
		*/

		return "A";
	}
	addStaff() {
		let nextStaffs = this.state.staffs
		nextStaffs.push(new Staff({ noteCount: this.state.noteCount, staffNum: this.state.staffs.length }))
		this.setState({ staffs: nextStaffs })
	}
	getStaff(i) {
		return this.state.staffs[i]
	}
	shareDoc() {
		axios.post('http://localhost:8000/permissions/new', {
			document: this.state.document._id,
			isOwner: false,
			canEdit: true,
			canView: true,
			email: 'userc@gmail.com'
		}).then(response => {
			console.log(response.data)
			if (!response.data.errmsg) {
				console.log('successful share')
			} else {
				console.log('error')
			}
		}).catch(error => {
			console.log('share error: ')
			console.log(error)
		})
	}
}

export default EditDocument;
