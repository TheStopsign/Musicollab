//src/components/Staff.js

import React, { Component } from 'react';
import '../css/Staff.css';
import Note from './Note';
import WholeNote from './WholeNote';
import HalfNote from './HalfNote';
import QuarterNote from './QuarterNote';
import EighthNote from './EighthNote';
import WholeRest from './WholeRest';
import HalfRest from './HalfRest';
import QuarterRest from './QuarterRest';
import EighthRest from './EighthRest';

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
			notes: [new WholeRest({ note: "R", measure: props.staffNum, location: 0 })],
			noteCount: props.noteCount
		}
	}
	makeNote(note, noteValue, measure, locationCount) {
		var dots = 0;
		if (noteValue >= 32){
			var dotValue = 16;
			while(noteValue > 32){
				noteValue -= dotValue;
				dotValue /= 2;
				dots += 1;
			}
			if (note == "R")
				return new WholeRest({ note: note, measure: measure, location: locationCount, dots: dots });
			else
				return new WholeNote({ note: note, measure: measure, location: locationCount, dots: dots });
		}
		else if (noteValue >= 16){
			var dotValue = 8;
			while(noteValue > 16){
				noteValue -= dotValue;
				dotValue /= 2;
				dots += 1;
			}
			if (note == "R")
				return new HalfRest({ note: note, measure: measure, location: locationCount, dots: dots });
			else
				return new HalfNote({ note: note, measure: measure, location: locationCount, dots: dots });
		}
		else if (noteValue >= 8){
			var dotValue = 4;
			while(noteValue > 8){
				noteValue -= dotValue;
				dotValue /= 2;
				dots += 1;
			}
			if (note == "R")
				return new QuarterRest({ note: note, measure: measure, location: locationCount, dots: dots });
			else
				return new QuarterNote({ note: note, measure: measure, location: locationCount, dots: dots });
		}
		else if (noteValue >= 4){
			var dotValue = 2;
			while(noteValue > 4){
				noteValue -= dotValue;
				dotValue /= 2;
				dots += 1;
			}
			if (note == "R")
				return new EighthRest({ note: note, measure: measure, location: locationCount, dots: dots });
			else
				return new EighthNote({ note: note, measure: measure, location: locationCount, dots: dots });
		}
		else if(noteValue >= 2){
			alert("16nd note not implemented yet")
			return null;
		}
		else{
			alert("32nd note not implemented yet")
			return null;
		}
	}
	addNote(note) {

		var pos = note.state.location
		var measure = note.state.measure

		if (this.state.notes.length < pos) {
			alert("addNote was given invalid note");
			return;
		}

		var totalLength = 0;
		var locationCount = 0;
		let nextNotes = [];
		for (var i = 0; i < this.state.notes.length; i++) {

			// if the position of the changed note is reached determine how to add it
			if (i == pos) {
				// determines how much the new note will change the measure
				var lengthChange = (note.getSize() - this.getNote(i).getSize());
				totalLength += this.getNote(i).getSize();
				if (lengthChange > 0) {
					// if the new note will not fit in the measure, have it fill the remaining space
					if (totalLength + lengthChange > this.state.noteCount) {
						var newLength = this.state.noteCount - totalLength + this.getNote(i).getSize();

						var oldNote = this.getNote(i).state.note;
						var noteValue = 1;
						var addNote;
						while (newLength > 0) {
							addNote = newLength % 2;
							newLength = Math.floor(newLength / 2);

							if (addNote == 0) {
								noteValue *= 2;
								continue;
							}
							var newNote = this.makeNote(note.getNote(), noteValue, measure, locationCount);
							nextNotes.push(newNote);

							noteValue *= 2;
							locationCount += 1;
						}
						break;

					}
					else {
						var oldNote = this.getNote(i).state.note;
						var newNote = this.makeNote(note.getNote(), note.getSize(), measure, locationCount);
						nextNotes.push(newNote);
						locationCount += 1;

						while (lengthChange > 0) {
							i += 1;
							totalLength += this.getNote(i).getSize();
							lengthChange -= this.getNote(i).getSize()

						}
						lengthChange = Math.abs(lengthChange);

						oldNote = this.getNote(i).state.note;
						var noteValue = 1;
						var addNote;
						while (lengthChange > 0) {
							addNote = lengthChange % 2;
							lengthChange = Math.floor(lengthChange / 2);

							if (addNote == 0) {
								noteValue *= 2;
								continue;
							}
							var newNote = this.makeNote(oldNote, noteValue, measure, locationCount);
							nextNotes.push(newNote);

							noteValue *= 2;
							locationCount += 1;
						}
					}
				}
				else if (lengthChange <= 0) {
					lengthChange = Math.abs(lengthChange)
					nextNotes.push(note);
					locationCount += 1;

					var oldNote = this.getNote(i).state.note;
					var noteValue = 1;
					var addNote;
					while (lengthChange > 0) {
						addNote = lengthChange % 2;
						lengthChange = Math.floor(lengthChange / 2);

						if (addNote == 0) {
							noteValue *= 2;
							continue;
						}
						var newNote = this.makeNote(oldNote, noteValue, measure, locationCount);
						nextNotes.push(newNote);

						noteValue *= 2;
						locationCount += 1;
					}
				}
			}
			// if the current note isn't changed add it back unchanged
			else {
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
