//src/components/Accounts.js

import React, { Component } from 'react';
import '../css/EditDocument.css';
import axios from 'axios';
import io from 'socket.io-client';
import NoteTB from './noteToolbar';
import Share from './Share';
import Instrument from './Instrument';
import clef from '../assetts/g-clef.svg';
import Logo from '../assetts/logo.svg';

const notetb = new NoteTB()

class EditDocument extends Component {
	render() {
		return (
			<div className="EditDocument">

				<div className="row align-items-center Doctoolbar">

					<div className="col-2">
						<a href="/home" className="svg">
							<img src={Logo} alt="Logo" height="80px" />
						</a>
					</div>

					<div className="col-2 keySigTB">

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

					<div className="col padding-0">
						{/* the render location for the notebar class */}
						<div className="noteBar" id="noteBar">
							{
								notetb.render()
							}
						</div>

					</div>


				</div>

				<div className="row main container-fluid">
					<div className="row subMain">
						{/* space for adding instruments*/}
						<div className="col-2 quickbar section">
							<div className="row instrumentRow">
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
							</div>
							<div className="row InstrumentAdder">
								<input type="text" id="newInstrument"></input>
								<button className="btn btn-primary addInstrumentBtn" id="addInstrumentBtn">Add</button>
							</div>
						</div>


						<div className="col document section">

							<div className="container-fluid musicsheet">
								<div className='container-fluid sheet'>
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
													<img className="clef" src={clef}></img>
													{ment.render()}
												</div>
											}
										})
									}
									<div className="addStaffBtnContainer">
										<button id="addStaffBtn" className="btn addStaffBtn">+</button>
									</div>

								</div>
							</div>
						</div>

					</div>
				</div>

				<div className="row viewers container-fluid">
					{/* space for list of users, and a share button to share with new users */}
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
						<div className="col shareCol">
							<Share docID={this.props.match.params.id} />
						</div>
					</div>
				</div>

			</div>
		);
	}
	constructor(props) {
		super(props);
		this.state = {
			document: {}, //document object
			socket: {}, //socket
			selectedNoteTB: 0,
			selectedNoteDOC: 0,
			usercount: 0, //active viewers
			instruments: [], //instrument objects
		}
		this.getInstrument = this.getInstrument.bind(this);
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
					this.setState({ instruments: this.state.instruments })
				});
				sock.on('addinstrument', (instrument) => {
					this.addInstrument(instrument)
				});
				sock.on('usercount', (count) => {
					this.setState({ usercount: count })
				});
				sock.on('addnote', (measure, newNote) => {
					this.getInstrument(newNote.instrument).addNote(measure, newNote.pitch, newNote.noteLength, newNote.loc)
					this.setState({ instruments: this.state.instruments })
				})
				sock.on('changetime', (newTime) => {
					console.log("Received changetime", newTime)
					this.changeTime(newTime)
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


					var newTime = topTime * (32 / bottomTime)

					this.state.socket.emit('changetime', { room: this.state.document._id, newTime: newTime });

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
							if (this.state.selectedNoteTB != 0) {
								this.state.selectedNoteTB.className = this.state.selectedNoteTB.className.slice(0, -8);
							}
							path[1].classList.add("selected");
							this.state.selectedNoteTB = path[1];

						}
						//otherwise we are selecting a note in the document itself
						else {

							if (this.state.selectedNoteDOC != 0) {
								this.state.selectedNoteDOC.className = this.state.selectedNoteDOC.className.slice(0, -8);
							}

							path[1].classList.add("selected");
							this.state.selectedNoteDOC = path[1];

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

				document.addEventListener('keydown', (e) => {
					var usedKeys = ['e', 'f', 'g', 'a', 'b', 'c', 'd', 'r'] //'j','k','l','i',
					var navKeys = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"]
					if (usedKeys.includes(e.key)) {
						//gets the currently selected notelength from the dropdown menu
						var noteSelectionTB = this.state.selectedNoteTB.id;
						if (!noteSelectionTB) {
							this.state.selectedNoteTB = document.getElementById("fakenote").firstElementChild.firstElementChild;
							this.state.selectedNoteTB.classList.add("selected");
							noteSelectionTB = this.state.selectedNoteTB.id;
						}
						//gets the currently selected note in the doc
						//do nothing if no note is selected
						var noteSelectionDOC = this.state.selectedNoteDOC;
						if (!noteSelectionDOC) {
							return
						} else {
							noteSelectionDOC = this.state.selectedNoteDOC.children[0]
						}

						//gets the newNote information and creates it
						var measure = Number(noteSelectionDOC.classList[1].slice(8));
						var location = Number(noteSelectionDOC.classList[2].slice(9));
						var instrument = noteSelectionDOC.classList[3].slice(11);

						//select pitch using the key the user pressed
						var newPitch = 0;
						switch (e.key) {
							case 'e':
								newPitch = "E"
								break;
							case 'f':
								newPitch = "F"
								break;
							case 'g':
								newPitch = "G"
								break;
							case 'a':
								newPitch = "A"
								break;
							case 'b':
								newPitch = "B"
								break;
							case 'c':
								newPitch = "C"
								break;
							case 'd':
								newPitch = "D"
								break;
							default:
								break;
						}
						var dotValue = document.getElementById("dotCheck").value
						if (this.state.selectedNoteTB.classList.contains("NTBR")) {
							newPitch = "R"
						}

						var multiplier = 0.5
						var noteValue = Number(noteSelectionTB);
						while (dotValue > 0 && (multiplier * noteSelectionTB) >= 1) {
							noteValue += multiplier * noteSelectionTB;
							dotValue -= 1;
							multiplier /= 2;
						}

						var newNote = { pitch: newPitch, noteLength: noteValue, loc: location, instrument: instrument }

						//tell the server you want to add a note
						this.state.socket.emit('addnote', { room: this.state.document._id, staff: measure, note: newNote });

						// due to the nature of react this needs to wait for the new note to be added to the page
						// otherwise it will only find the old note

						setTimeout(() => {
							var newSelection = document.getElementsByClassName("measure:" + measure + " location:" + location + " instrument:" + instrument)[0].parentElement;
							newSelection.classList.add("selected")
							this.state.selectedNoteDOC = newSelection
						}, 50);
					}
					else if (navKeys.includes(e.key)) {
						if (this.state.selectedNoteDOC == 0) {
							return
						}
						e.preventDefault()
						//gets the currently selected note in the doc
						//do nothing if no note is selected
						var noteSelectionDOC = this.state.selectedNoteDOC;
						if (!noteSelectionDOC) {
							return
						} else {
							noteSelectionDOC = this.state.selectedNoteDOC.children[0]
						}

						//gets the newNote information and creates it
						var measure = Number(noteSelectionDOC.classList[1].slice(8));
						var location = Number(noteSelectionDOC.classList[2].slice(9));
						var instrument = noteSelectionDOC.classList[3].slice(11);

						if ((location + 1 == this.getInstrument(instrument).state.staffs[measure].state.notes.length && measure + 1 == this.getInstrument(instrument).state.staffs.length && e.key == "ArrowRight") ||
							(location == 0 && measure == 0 && e.key == "ArrowLeft")) {
							return
						}
						else if (location + 1 == this.getInstrument(instrument).state.staffs[measure].state.notes.length && e.key == "ArrowRight") {
							measure += 1;
							location = 0;
						}
						else if (location == 0 && e.key == "ArrowLeft") {
							measure -= 1;
							location = this.getInstrument(instrument).state.staffs[measure].state.notes.length - 1
						}
						else if (e.key == "ArrowRight") {
							location += 1;
						}
						else if (e.key == "ArrowLeft") {
							location -= 1;
						}
						// remove selection from old element, add selection to new element, change selected element to new element
						this.state.selectedNoteDOC.className = this.state.selectedNoteDOC.className.slice(0, -8);
						var newSelection = document.getElementsByClassName("measure:" + measure + " location:" + location + " instrument:" + instrument)[0].parentElement;
						newSelection.classList.add("selected")
						this.state.selectedNoteDOC = newSelection
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
		//TODO fill in missing staffs to catch up
	}
	getInstrument(instrument) {
		for (let i in this.state.instruments) {
			if (this.state.instruments[i].getName() == instrument) {
				return this.state.instruments[i]
			}
		}
		return null
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

	//changes the time signature
	changeTime(newTime) {
		// calculates the noteCount
		this.state.noteCount = newTime;

		for (let j = 0; j < this.state.instruments.length; j++) {
			var instrument = this.state.instruments[j]
			for (var i = 0; i < instrument.state.staffs.length; i++) {
				instrument.getStaff(i).changeTime(this.state.noteCount);
			}
		}
		this.setState({ instruments: this.state.instruments })
	}

}

export default EditDocument;
