//src/components/Accounts.js

import React, { Component } from 'react';
import '../css/EditDocument.css';
import axios from 'axios';
import io from 'socket.io-client';
import Staff from './Staff';
import NoteTB from './noteToolbar';
import EighthNote from './EighthNote';
import QuarterNote from './QuarterNote';
import HalfNote from './HalfNote';
import WholeNote from './WholeNote';

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
						<div className="dropdown">
							<select id="currentNote">
								<option value="32">WholeNote</option>
								<option value="16">Half</option>
								<option value="8">Quarter</option>
								<option value="4">Eighth</option>
								<option value="2">Sixteenth</option>
								<option value="1">Thirty-Second</option>
							</select>
						</div>
					</div>

					<div className="col padding-0">
						<div id="currentNote" className="row">
							<div value="4">{notetb.render(0)}</div>
							<div value="8">{notetb.render(1)}</div>
							<div value="16">{notetb.render(2)}</div>
							<div value="32">{notetb.render(3)}</div>
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
										<center>
											<button id="addStaffBtn" className="btn">+</button>
										</center>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>

				<div className="container-fluid">
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
	}
	componentDidMount() {
		this.joinEditSession()
			.then(() => {
				// document.getElementById("noteBar").addEventListener("click", (event) => {
				// 	if (event.path[1].classList[0] == "note") {
				// 		if (this.state.selectedNote != 0) {
				// 			// this.state.selectedNote.remove("selected");
				// 			this.state.selectedNote.className = this.state.selectedNote.className.slice(0, -8);
				// 		}
				// 		event.path[1].classList.add("selected");
				// 		this.state.selectedNote = event.path[1];
				// 	}
				// })
				////////////////////////////////////////////////////
				document.getElementById("addStaffBtn").addEventListener("click", () => {
					this.state.socket.emit('addstaff', { room: "" + this.state.document._id });
				})
				this.addStaff()
				this.addStaff()
				this.addStaff()


				var docInfo = this;
				document.addEventListener('click', function (e) {

					// isNote is true if clicked element is a note/rest component
					var isNote = e.target.classList.contains('vline');
					isNote = isNote || e.target.classList.contains('circle');
					isNote = isNote || e.target.classList.contains('whole_circle');
					isNote = isNote || e.target.classList.contains('half_circle');
					isNote = isNote || e.target.classList.contains('whole_rest');
					isNote = isNote || e.target.classList.contains('half_rest');


					if (e.target && isNote) {
						//gets the currently selected notelength from the dropdown menu
						var noteSelection = document.getElementById("currentNote");
						noteSelection = noteSelection.options[noteSelection.selectedIndex].value;

						//gets the newNote information and creates it
						var measure = Number(e.target.classList[1].slice(8));
						var location = Number(e.target.classList[2].slice(9));
						var newPitch = docInfo.getPitch(measure);

						var newNote = docInfo.getStaff(measure).makeNote(newPitch, noteSelection, measure, location);

						//adds note to the measure and updates render
						docInfo.getStaff(measure).addNote(newNote)
						docInfo.setState({ staffs: docInfo.state.staffs })
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
				this.setState({ socket: sock })
			})
			.catch(function (error) {
				console.log(error);
			})
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
}

export default EditDocument;
