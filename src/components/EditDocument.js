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
					<div className="col">
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

					<div className="col">
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

					<div className="col keySigTB">

						<h4 className=""> Time Signature:&nbsp; </h4>


						<div className="ksig">
							<span id="topTime"> 4 </span>
						</div>
						<span className="ksigmiddle"> / </span>
						<div className="ksig">
							<span id="bottomTime"> 4 </span>
						</div>
						<button className="btn" id="timeButton" type="button">Update</button>

					</div>
					<div className="dropdown">
									<select id = "dotCheck">
										<option value="0">No Dot</option>
										<option value="1">One Dot</option>
										<option value="2">Two Dots</option>
									</select>
								</div>

					<div className="col-6 padding-0">

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

				<div className="container-fluid">
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
							<button className="btn btn-primary" onClick={this.shareDoc}> Share</button>
						</div>
					</footer>
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

				document.getElementById("timeButton").addEventListener("click", () => {

					// <textarea cols="5" rows="1" id="topTime"></textarea>
					// <div className="dropdown">
					// 	<select id="bottomTime">
					// 		<option value="2">2</option>
					// 		<option value="4">4</option>
					// 		<option value="8">8</option>
					// 		<option value="16">16</option>
					// 		<option value="32">32</option>
					//
					// 	</select>
					// </div>


					// gets the current time sig from the temporary GUI
					var topTime = document.getElementById("topTime").innerHTML;
					var bottomTime = document.getElementById("bottomTime").innerHTML;


					// if note count hasn't changed we don't have to update anything
					if(this.state.noteCount == topTime * (32/bottomTime))
						return;
					// calculates the noteCount
					this.state.noteCount = topTime * (32/bottomTime);
					// alert(topTime + "\n--\n" + bottomTime + "       =  " + this.state.noteCount);
					// updates the number of notes in each measure
					for(var i=0; i <this.state.staffs.length; i++){
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
							if (this.state.selectedNote != 0) {
								this.state.selectedNote.className = this.state.selectedNote.className.slice(0, -8);
							}
							path[1].classList.add("selected");
							this.state.selectedNote = path[1];
							console.log(this.state.selectedNote);

						}
						//otherwise change current note value using selected note
						else {
							//gets the currently selected notelength from the dropdown menu
							var noteSelection = this.state.selectedNote.id;
							if (!noteSelection){
								this.state.selectedNote = document.getElementById("fakenote").firstElementChild.firstElementChild;
								this.state.selectedNote.classList.add("selected");
								noteSelection = this.state.selectedNote.id;
							}


							//gets the newNote information and creates it
							var measure = Number(e.target.classList[1].slice(8)); //wont this break with more than 9 measures?
							var location = Number(e.target.classList[2].slice(9));
							var newPitch = 0;
							var dotValue = document.getElementById("dotCheck").value
							if (this.state.selectedNote.classList.contains("NTBR")) {
								newPitch = "R"
							} else {
								newPitch = docInfo.getPitch(measure);
							}
							var multiplier = 0.5
							var noteValue = Number(noteSelection);
							while(dotValue > 0 && (multiplier * noteSelection) >= 1){
								noteValue += multiplier * noteSelection;
								dotValue -= 1;
								multiplier /= 2;
							}

							var newNote = { pitch: newPitch, noteLength: noteValue, loc: location }

							this.state.socket.emit('addnote', { room: this.state.document._id, staff: measure, note: newNote });
						}
					} else if ("ksig" == path[1].classList[0]) {
						// get the value of the current time signature that was clicked
						// increase it by one, if it is over 32, set it to 2
						var val = parseInt(e.target.innerHTML)
						if (val > 31){
							val = 1
						}
						e.target.innerHTML = val+1
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
		this.getStaff(measure).addNote(newNote)
		this.setState({ staffs: this.state.staffs })
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
	shareDoc2(email, isOwner, canEdit, canView){
		let sharedUserID; // To store the sharedUserID if found from /findEmail GET

		// Query database for email (account) to share document with
		axios.get('http://localhost:8000/accounts/findEmail/'+email)
			.then(res =>{
				//found account
				if(res.status == 200){
					console.log('Account found, database id:', res.data)
					sharedUserID = res.data;

					let permission; // to store new permission object from /new POST
					// Now create a new permission to represent sharing
					axios.post('http://localhost:8000/permissions/new', { 
							document: this.state.document.id,
							isOwner: isOwner,
							canEdit: canEdit,
							canView: canView,
						}).then(res2 => {
						console.log('New permission:', res2.data)
						permission = res2.data;
						
						// Add the new permission_id to the shared user's list of permissions
						axios.post('http://localhost:8000/accounts/newPermission', { 
								permission: permission,
								userID: sharedUserID
							}).then(res3 =>{
								console.log('Successfully saved permission to account', res3);
							}).catch(error =>{
								console.log('Share permission with account error: ', error);
							})
					}).catch(error => {
						console.log('permissions/new error: ', error)
					})
				}else{
					console.log('Account not found, status:', res.status)
				}
				
			}).catch(err => {
				console.log('accounts/findEmail ERROR: ', err)
			})
	}
}

export default EditDocument;
