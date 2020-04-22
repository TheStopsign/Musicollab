//src/components/Accounts.js

import React, { Component } from 'react';
import '../css/EditDocument.css';
import axios from 'axios';
import io from 'socket.io-client';
import Staff from './Staff';
import NoteTB from './noteToolbar';
import Share from './Share';

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
							<h4> quickbar </h4>
						</div>


						<div className="col document section">

							<div className="musicsheet">
								<div className='sheet'>
									{/* this is where the actual document gets rendered in the page, see staff.js for note placement */}
									{/* see addnote() lower in the page for how notes get added to the staff */}
									<center>
										<h1 className="doc_title">{this.state.document.title}</h1>
									</center>
									<div className="row">
										<div className="dropdown instrumentMenu">
											<select id="instrument">
												<option value="0">No Instrument</option>
												<option value="1">Alto Saxophone</option>
												<option value="2">Flute</option>
												<option value="3">Clarinet</option>
											</select>
										</div>
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
			staffs: [], //staff objects
			document: {}, //document object
			socket: {}, //socket
			selectedNoteTB: 0,
			selectedNoteDOC: 0,
			usercount: 0, //active viewers
			noteCount: 32 //max amount of notes in one staff
		}
	}
	componentDidMount() {
		this.joinEditSession()
	}
	joinEditSession() {
		axios.get(`http://localhost:8000/documents/` + this.props.match.params.id) //make a GET request to the server
			.then(res => {
				this.setState({ document: res.data }); //handle the response payload
				const sock = io.connect("http://localhost:3001");

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
				sock.on('connect', () => {
					console.log(sock.id);
					sock.emit("joinsession", { room: "" + this.state.document._id, document: this.state.document });
				});
				this.setState({ socket: sock })

				document.getElementById("addStaffBtn").addEventListener("click", () => {
					//request to server when you want to add a staff
					this.state.socket.emit('addstaff', { room: "" + this.state.document._id, document: this.state.document });
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
					for (var i = 0; i < this.state.staffs.length; i++) {
						this.getStaff(i).changeTime(this.state.noteCount);
					}
					this.setState({ staffs: this.state.staffs })
				})

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

							if(this.state.selectedNoteDOC != 0 ){
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
					else if (path[1].classList[1] == "instrumentMenu") {
						var instrumentValue = document.getElementById("instrument").value;
						if (instrumentValue == 0) {
							this.setState({ staffs: [] })
						}
					}
				});

				document.addEventListener('keypress', (e) => {
					var usedKeys = ['a','s','d','f','g','j','k','l','i','r']
					if(usedKeys.includes(e.key)) {
						//gets the currently selected notelength from the dropdown menu
						var noteSelectionTB = this.state.selectedNoteTB.id;
						if (!noteSelectionTB) {
							this.state.selectedNoteTB = document.getElementById("fakenote").firstElementChild.firstElementChild;
							this.state.selectedNoteTB.classList.add("selected");
							noteSelectionTB = this.state.selectedNoteTB.id;
						}
						var noteSelectionDOC = this.state.selectedNoteDOC;
						if (!noteSelectionDOC) {
							return
						} else {
							console.log(noteSelectionDOC);
							noteSelectionDOC = this.state.selectedNoteDOC.children[0]
						}

						//gets the newNote information and creates it
						var measure = Number(noteSelectionDOC.classList[1].slice(8));
						var location = Number(noteSelectionDOC.classList[2].slice(9));


						var newPitch = 0;
						switch(e.key) {
						  case 'a':
						   	newPitch = "E"
						    break;
						  case 's':
						   	newPitch = "F"
						    break;
						  case 'd':
						   	newPitch = "G"
						    break;
						  case 'f':
						   	newPitch = "A"
						    break;
						  case 'g':
						   	newPitch = "B"
						    break;
						  default:
						    console.log("hello");
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

						var newNote = { pitch: newPitch, noteLength: noteValue, loc: location }


						//tell the server you want to add a note
						this.state.socket.emit('addnote', { room: this.state.document._id, staff: measure, note: newNote });

						// due to the nature of react this needs to wait for the new note to be added to the page
						// otherwise it will only find the old note

						setTimeout(() => {
							var newSelection = document.getElementsByClassName("measure:"+measure+" location:"+location)[0].parentElement;
							newSelection.classList.add("selected")
							this.state.selectedNoteDOC = newSelection
						}, 50);

					}
				});
				this.setState({ staffs: docInfo.state.staffs }) //re-render the staffs
			});

	}
	addNote(measure, newPitch, noteSelection, location) {
		//adds note to the measure and updates render

		let newNote = this.getStaff(measure).makeNote(newPitch, noteSelection, measure, location);
		this.getStaff(measure).addNote(newNote)
		this.setState({ staffs: this.state.staffs }) //update UI
	}

	// add a new staff to the document
	addStaff() {
		let nextStaffs = this.state.staffs
		nextStaffs.push(new Staff({ noteCount: this.state.noteCount, staffNum: this.state.staffs.length }))
		this.setState({ staffs: nextStaffs })
	}
	// get the ith staff
	getStaff(i) {
		return this.state.staffs[i]
	}
}

export default EditDocument;
