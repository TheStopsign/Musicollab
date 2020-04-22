//src/components/Accounts.js

import React, { Component } from 'react';
import '../css/EditDocument.css';
import axios from 'axios';
import io from 'socket.io-client';
import NoteTB from './noteToolbar';
import Share from './Share';
import Instrument from './Instrument';

const notetb = new NoteTB()

class EditDocument extends Component {
	render() {
		return (
			<div className="EditDocument">

				<div className="row align-items-center head section">
					<div className="col">
						<div className="row">
							{/* this is where the user selects the clef that is used in the music with a dropdown menu */}
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

					<div className="col">
						<div className="row">
							{/* User can select the key signature from a dropdown of different keys */}
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

					<div className="col keySigTB">

						{/* here the user can select the time signature by clicking on either number then clicking update */}
						<h4 className=""> Time Signature:&nbsp; </h4>


						<div className="ksig top">
							<span id="topTime"> 4 </span>
						</div>
						<span className="ksigmiddle"> / </span>
						<div className="ksig bot">
							<span id="bottomTime"> 4 </span>
						</div>
						<button className="btn" id="timeButton" type="button">Update</button>

					</div>
					<div className="dropdown">
						{/* a dropdown that allows the user to dot their notes, two dots just for fun */}
						<select id="dotCheck">
							<option value="0">No Dot</option>
							<option value="1">One Dot</option>
							<option value="2">Two Dots</option>
						</select>
					</div>

					<div className="col-6 padding-0">
						{/* the render location for the notebar class */}
						<div className="noteBar" id="noteBar">
							{
								notetb.render()
							}
						</div>

					</div>


				</div>

				<div className="main container-fluid">
					<div className="row subMain">
						{/* space for faster access to certain actions, unused */}
						<div className="col-1 quickbar section">
							<ul id="instruments">
								{
									this.state.instruments.map(function (instrument, i) {
										return <li key={i}>
											<input type="checkbox" className="instrumentCheckbox" value={instrument.getName()} id={instrument.getName()} />
											<label htmlFor={instrument.getName()}>{instrument.getName()}</label>
										</li>
									})
								}
							</ul>
							<div className="row">
								<input type="text" id="newInstrument"></input>
								<button className="btn btn-primary" id="addInstrumentBtn">Add</button>
							</div>
						</div>


						<div className="col document section">

							<div className="musicsheet">
								<div className='sheet'>
									{/* this is where the actual document gets rendered in the page, see staff.js for note placement */}
									{/* see addnote() lower in the page for how notes get added to the staff */}
									<center>
										<h1 className="doc_title">{this.state.document.title}</h1>
									</center>

									{/* Try to display groups */}
									{
										this.state.instruments.map(function (ment, i) {
											if (ment.state.show) {
												return <div className="row">
													<div key={i}><h6 className="instrumentlabel">{ment.getName()}</h6></div>
													{ment.render()}
												</div>
											}
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

				<div className="container-fluid">
					{/* space for list of users, and a share button to share with new users */}
					<footer className="row section footer users">
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
							<Share docID={this.props.match.params.id} />
						</div>
					</footer>
				</div>

			</div>
		);
	}
	constructor(props) {
		super(props);
		this.state = {
			document: {}, //document object
			socket: {}, //socket
			selectedNote: 0,
			usercount: 0, //active viewers
			noteCount: 32, //max amount of notes in one staff
			instruments: [], //instrument objects
		}
		this.getSelectedInstruments = this.getSelectedInstruments.bind(this);
	}
	componentDidMount() {
		this.joinEditSession()
	}
	joinEditSession() {
		let self = this;
		axios.get(`http://localhost:8000/documents/` + this.props.match.params.id) //make a GET request to the server
			.then(res => {
				this.setState({ document: res.data }); //handle the response payload
				const sock = io.connect("http://localhost:3001");

				sock.on('addstaff', () => {
					for (let i in self.state.instruments) {
						self.state.instruments[i].addStaff()
					}
				});
				sock.on('addinstrument', (instrument) => {
					this.addInstrument(instrument)
				});
				sock.on('usercount', (count) => {
					this.setState({ usercount: count })
				});
				sock.on('addnote', (measure, newNote) => {
					this.addNote(measure, newNote.pitch, newNote.noteLength, newNote.loc)
				})
				sock.on('connect', () => {
					sock.emit("joinsession", { room: "" + this.state.document._id, document: this.state.document });
				});
				this.setState({ socket: sock })

				document.getElementById("addStaffBtn").addEventListener("click", () => {
					//request to server when you want to add a staff
					this.state.socket.emit('addstaff', { room: "" + this.state.document._id });
				})

				document.getElementById("addInstrumentBtn").addEventListener("click", () => {
					//request to server when you want to add an instrument
					let newInstrument = document.getElementById("newInstrument")
					if (newInstrument.value != "" && !this.state.instruments.includes(newInstrument.value)) {
						this.state.socket.emit('addinstrument', { room: "" + this.state.document._id, instrument: newInstrument.value });
						newInstrument.value = ""
					}
				})

				document.getElementById("timeButton").addEventListener("click", () => {

					// gets the current time sig from the temporary GUI
					var topTime = Number(document.getElementById("topTime").innerHTML);
					var bottomTime = Number(document.getElementById("bottomTime").innerHTML);


					// if note count hasn't changed we don't have to update anything
					if (this.state.noteCount == topTime * (32 / bottomTime))
						return;
					// calculates the noteCount
					this.state.noteCount = topTime * (32 / bottomTime);
					// alert(topTime + "\n--\n" + bottomTime + "       =  " + this.state.noteCount);
					// updates the number of notes in each measure
					for (let j = 0; j < this.state.instruments.length; j++) {
						for (var i = 0; i < this.state.instruments[j].staffs.length; i++) {
							this.getStaff(i).changeTime(this.state.noteCount);
						}
						this.state.instruments[j].setState({ staffs: this.state.instruments[j].staffs })
					}
				})

				this.addInstrument("Piano")

				var docInfo = this;
				document.addEventListener('click', (e) => {
					//find path to current element
					let path = [e.target];
					let elem = e.target;
					for (var i = 0; i < 4; i++) {
						path.push(elem.parentElement);
						elem = elem.parentElement;
					}

					//use path to check if current element is a note
					if (path[1].classList[0] == "note" || path[1].classList[0] == "rest") {

						// if current note is on the toolbar at the top, select it
						if (path[3].id == "ntb" || path[4].id == "ntb") {
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
							if (!noteSelection) {
								this.state.selectedNote = document.getElementById("fakenote").firstElementChild.firstElementChild;
								this.state.selectedNote.classList.add("selected");
								noteSelection = this.state.selectedNote.id;
							}


							//gets the newNote information and creates it
							var measure = Number(e.target.classList[1].slice(8));
							var location = Number(e.target.classList[2].slice(9));
							var newPitch = 0;
							var dotValue = document.getElementById("dotCheck").value
							if (this.state.selectedNote.classList.contains("NTBR")) {
								newPitch = "R"
							} else {
								newPitch = docInfo.getPitch(e.offsetY, measure);
							}
							var multiplier = 0.5
							var noteValue = Number(noteSelection);
							while (dotValue > 0 && (multiplier * noteSelection) >= 1) {
								noteValue += multiplier * noteSelection;
								dotValue -= 1;
								multiplier /= 2;
							}

							var newNote = { pitch: newPitch, noteLength: noteValue, loc: location }

							//tell the server you want to add a note
							this.state.socket.emit('addnote', { room: this.state.document._id, staff: measure, note: newNote });
						}
					} else if ("ksig" == path[1].classList[0]) {
						// get the value of the current time signature that was clicked
						// increase it by one, if it is over 32, set it to 2
						var val = parseInt(e.target.innerHTML)
						var increment = 1
						if (val > 31) {
							val = 1
						}
						if (path[1].classList[1] == "bot") {
							increment = val
						}
						e.target.innerHTML = val + increment
					}
				});
			});

	}
	addInstrument(instrument) {
		let ments = this.state.instruments
		let newMent = new Instrument({ name: instrument })
		ments.push(newMent)
		this.setState({ instruments: ments })

		var checkbox = document.querySelector("input[id=" + instrument + "]")

		let self = this
		checkbox.addEventListener('change', function () {
			if (this.checked) {
				newMent.state.show = true
			} else {
				newMent.state.show = false
			}
			self.setState({ instruments: self.state.instruments })
		});
	}
	getSelectedInstruments() {
		let ments = []
		for (let i in this.state.instruments) {
			if (this.state.instruments[i].state.show) {
				ments.push(this.state.instruments[i])
			}
		}
		return ments
	}
	getPitch(yPos, measure) {
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
		alert("y: " + yPos);*/
		//change note pitch based off where on the notes staff you click
		if (yPos >= 0 && yPos < 10) {
			return "F";
		}
		else if (yPos >= 10 && yPos < 20) {
			return "E";
		}
		else if (yPos >= 20 && yPos < 30) {
			return "D";
		}
		else if (yPos >= 30 && yPos < 40) {
			return "C";
		}
		else if (yPos >= 40 && yPos < 50) {
			return "B";
		}
		else if (yPos >= 50 && yPos < 60) {
			return "A";
		}
		else if (yPos >= 60 && yPos < 70) {
			return "G";
		}
	}
}

export default EditDocument;
