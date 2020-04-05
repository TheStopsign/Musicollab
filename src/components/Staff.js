//src/components/Staff.js

import React, { Component } from 'react';
import '../css/Staff.css';
import Note from './Note';
import WholeNote from './WholeNote';
import HalfNote from './HalfNote';
import WholeRest from './WholeRest';
import HalfRest from './HalfRest';
import EighthNote from './EighthNote';
import QuarterNote from './QuarterNote';

class Staff extends Component {
	render() {
		return (
			<div className="staff">
				<div className="bars">
					<div className="F bar"></div>
					<div className="A bar"></div>
					<div className="C bar"></div>
					<div className="E bar"></div>
				</div >
				<div className="notes row">
					{
						this.state.notes.map(function (note) {
							return note.render()
						})
					}
				</div>
			</div >
		);
	}
	constructor(props) {
		super(props);
		this.state = {
			index: null,
			init_notes: "",
			notes: [new WholeRest({ note: "R",measure: props.staffNum,location:0 })],
			noteCount: props.noteCount
		}
	}
	makeNote(note,noteValue, measure,locationCount){
		if(noteValue == 1){
			alert("32nd note note implemented yet")
			return null;
		}
		//16th Note
		else if(noteValue == 2){
			alert("32nd note note implemented yet")
			return null;
		}
		//8th Note
		else if(noteValue == 4){
			if(note == "R")
				return new EighthNote({ note: "F",measure: measure, location: locationCount  });
			else
				return new EighthNote({ note: note,measure: measure, location: locationCount  });
		}
		//quarter Note
		else if(noteValue == 8){
			if(note == "R")
				return new QuarterNote({ note: "F",measure: measure, location: locationCount  });
			else
				return new QuarterNote({ note: note,measure: measure, location: locationCount  });

		}
		//half Note
		else if(noteValue == 16){
			if(note == "R")
				return new HalfRest({ note: note,measure: measure, location: locationCount  });
			else
				return new HalfNote({ note: note,measure: measure, location: locationCount  });
		}
		//whole Note
		else if(noteValue == 32){
			if(note == "R")
				return new WholeRest({ note: note,measure: measure, location: locationCount  });
			else
				return new WholeNote({ note: note,measure: measure, location: locationCount  });
		}
		else{
			alert("makeNote given invalid input");
			return null;
		}
	}
	addNote(note) {

		var pos = note.state.location
		var measure = note.state.measure

		if(this.state.notes.length < pos){
			alert("addNote was given invalid note");
			return;
		}

		var totalLength = 0; 
		var locationCount = 0;
		let nextNotes = [];
		for(var i=0; i < this.state.notes.length; i++){


			if(i == pos){

				var lengthChange = (note.getSize() - this.getNote(i).getSize());
				totalLength += this.getNote(i).getSize();
				if(lengthChange > 0){
					if(totalLength + lengthChange > this.state.noteCount){
						var newLength = this.state.noteCount - totalLength + this.getNote(i).getSize();

						var oldNote = this.getNote(i).state.note;
						var noteValue = 1;
						var addNote;
						while(newLength > 0){
							addNote = newLength % 2;
							newLength = Math.floor(newLength/2);

							if(addNote == 0){
								noteValue *= 2;
								continue;
							}
							var newNote = this.makeNote(oldNote,noteValue,measure,locationCount);
							nextNotes.push(newNote);

							noteValue *= 2;
							locationCount += 1;
						}
						break;

					}
					else{
						var oldNote = this.getNote(i).state.note;
						var newNote = this.makeNote(oldNote,note.getSize(),measure,locationCount);
						nextNotes.push(newNote);
						locationCount += 1;

						while(lengthChange > 0){
							i += 1;
							totalLength += this.getNote(i).getSize();
							lengthChange -= this.getNote(i).getSize()

						}
						lengthChange = Math.abs(lengthChange);

						oldNote = this.getNote(i).state.note;
						var noteValue = 1;
						var addNote;
						while(lengthChange > 0){
							addNote = lengthChange % 2;
							lengthChange = Math.floor(lengthChange/2);

							if(addNote == 0){
								noteValue *= 2;
								continue;
							}
							var newNote = this.makeNote(oldNote,noteValue,measure,locationCount);
							nextNotes.push(newNote);

							noteValue *= 2;
							locationCount += 1;
						}
					}
				}
				else if(lengthChange <= 0){
					lengthChange = Math.abs(lengthChange)
					nextNotes.push(note);
					locationCount += 1;

					var oldNote = this.getNote(i).state.note;
					var noteValue = 1;
					var addNote;
					while(lengthChange > 0){
						addNote = lengthChange % 2;
						lengthChange = Math.floor(lengthChange/2);

						if(addNote == 0){
							noteValue *= 2;
							continue;
						}
						var newNote = this.makeNote(oldNote,noteValue,measure,locationCount);
						nextNotes.push(newNote);

						noteValue *= 2;
						locationCount += 1;
					}
				}
			}
			else{
				totalLength += this.getNote(i).getSize();
				this.getNote(i).state.location = locationCount
				nextNotes.push(this.getNote(i));
				locationCount += 1;
			}
		}
		this.state.notes = nextNotes;

		// first version of function
		/*
		let nextNotes = this.state.notes
		nextNotes.push(note)
		this.setState({ notes: nextNotes })
		*/
	}
	getNote(i) {
		return this.state.notes[i]
	}
	changeNote(i, component) {
		this.state.notes[i] = component;
	}
}

export default Staff;
