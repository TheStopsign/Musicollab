//src/components/Staff.js

import React, { Component } from 'react';
import '../css/Staff.css';
import Note from './Note';
import WholeNote from './WholeNote';
import HalfNote from './HalfNote';
import QuarterNote from './QuarterNote';
import EighthNote from './EighthNote';
import SixteenthNote from './SixteenthNote';
import ThirtySecondNote from './ThirtySecondNote';
import WholeRest from './WholeRest';
import HalfRest from './HalfRest';
import QuarterRest from './QuarterRest';
import EighthRest from './EighthRest';
import SixteenthRest from './SixteenthRest';
import ThirtySecondRest from './ThirtySecondRest';

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
			notes: this.initialNotes(props.noteCount, props.staffNum),
			staffNum: props.staffNum,
			noteCount: props.noteCount
		}
	}
	// given a length, generates a list of rests to fill it
	initialNotes(time, staffNum, initialLocation) {
		var noteList = [];
		var currentLocation = initialLocation;
		var remainingNotes = time;
		// adds whole rests until there is not enough space left
		while(remainingNotes >= 32){
			noteList.push(new WholeRest({ note: "R", measure: staffNum, location: currentLocation }))
			remainingNotes -= 32;
			currentLocation += 1;
		}

		// fills in the remaining space 
		if(remainingNotes > 0)
			noteList.push(this.makeNote("R", remainingNotes, staffNum, currentLocation));

		return noteList;
	}
	// updates the time sig of the measure
	changeTime(newTime) {
		// gets the amount of change and updates the member variable
		var timeChange = newTime - this.state.noteCount;
		this.state.noteCount = newTime;
		var nextNotes = this.state.notes

		// if the length has increased, add rests to fill the extra time
		if (timeChange > 0) {
			// removes tail rests and adds them to the timeChange count
			var isPop = true;
			while (nextNotes.length > 0 && isPop) {
				if (nextNotes[nextNotes.length - 1].getNote() == "R") {
					timeChange += nextNotes.pop().getSize();
				}
				else
					isPop = false;
			}
			// gets the new rests and adds them to the note array
			var addedNotes = this.initialNotes(timeChange, this.staffNum,nextNotes.length + 1);
			nextNotes = nextNotes.concat(addedNotes);
		}
		// if the length has decreased, remove notes from the end
		else if (timeChange < 0) {
			// remove notes until the total time is equal to the new time
			while (timeChange != 0) {
				// removes the tail note and updates the time change
				var lastNote = nextNotes.pop();
				timeChange += lastNote.getSize();
				// if too much was removed add the note back in but smaller
				if (timeChange > 0) {
					var newNote = this.makeNote(lastNote.getNote(), timeChange, this.staffNum, lastNote.getLocation());
					nextNotes.push(newNote);
					break;
				}
			}
		}

		//updates measure with the new notes
		this.state.notes = nextNotes;
	}
	// given a notes information, creates the corresponding note object
	makeNote(note, noteValue, measure, locationCount) {
		var dots = 0;
		// Whole Note
		if (noteValue >= 32) {
			// finds how many dots are needed
			var dotValue = 16;
			while (noteValue > 32) {
				noteValue -= dotValue;
				dotValue /= 2;
				dots += 1;
			}
			if (note == "R")
				return new WholeRest({ note: note, measure: measure, location: locationCount, dots: dots });
			else
				return new WholeNote({ note: note, measure: measure, location: locationCount, dots: dots });
		}
		// Half Note
		else if (noteValue >= 16) {
			// finds how many dots are needed
			var dotValue = 8;
			while (noteValue > 16) {
				noteValue -= dotValue;
				dotValue /= 2;
				dots += 1;
			}
			if (note == "R")
				return new HalfRest({ note: note, measure: measure, location: locationCount, dots: dots });
			else
				return new HalfNote({ note: note, measure: measure, location: locationCount, dots: dots });
		}
		// Quarter Note
		else if (noteValue >= 8) {
			// finds how many dots are needed
			var dotValue = 4;
			while (noteValue > 8) {
				noteValue -= dotValue;
				dotValue /= 2;
				dots += 1;
			}
			if (note == "R")
				return new QuarterRest({ note: note, measure: measure, location: locationCount, dots: dots });
			else
				return new QuarterNote({ note: note, measure: measure, location: locationCount, dots: dots });
		}
		// Eighth Note
		else if (noteValue >= 4) {
			// finds how many dots are needed
			var dotValue = 2;
			while (noteValue > 4) {
				noteValue -= dotValue;
				dotValue /= 2;
				dots += 1;
			}
			if (note == "R")
				return new EighthRest({ note: note, measure: measure, location: locationCount, dots: dots });
			else
				return new EighthNote({ note: note, measure: measure, location: locationCount, dots: dots });
		}
		// Sixteenth Note
		else if (noteValue >= 2) {
			// finds how many dots are needed
			var dotValue = 1;
			while (noteValue > 2) {
				noteValue -= dotValue;
				dotValue /= 2;
				dots += 1;
			}
			if (note == "R")
				return new SixteenthRest({ note: note, measure: measure, location: locationCount, dots: dots });
			else
				return new SixteenthNote({ note: note, measure: measure, location: locationCount, dots: dots });
		}
		// ThirtySecond Note
		else {
			if (note == "R")
				return new ThirtySecondRest({ note: note, measure: measure, location: locationCount, dots: 0 });
			else
				return new ThirtySecondNote({ note: note, measure: measure, location: locationCount, dots: 0 });
		}
	}
	// adds the note to the measure and adjusts other notes so it can fit 
	addNote(note) {

		// gets the new notes basic information
		var pos = note.state.location
		var measure = note.state.measure

		// if the position of the new note doesn't exist, return
		if (this.state.notes.length < pos) {
			alert("addNote was given invalid note");
			return;
		}

		var totalLength = 0;
		var locationCount = 0;
		let nextNotes = [];
		// Iterages over each note and determines if a change is needed
		for (var i = 0; i < this.state.notes.length; i++) {
			// if the position of the changed note is reached determine how to add it
			if (i == pos) {
				// determines how much the new note will change the measure
				var lengthChange = (note.getSize() - this.getNote(i).getSize());
				totalLength += this.getNote(i).getSize();

				// if the new note is longer than the old one, overwrite notes after it
				if (lengthChange > 0) {
					// if the new note will not fit in the measure, have it fill the remaining space
					if (totalLength + lengthChange > this.state.noteCount) {
						// changes the length of the new note to equal the remaining space
						var newLength = this.state.noteCount - totalLength + this.getNote(i).getSize();

						// adds the new note and updates the location
						var newNote = this.makeNote(note.getNote(), newLength, measure, locationCount);
						nextNotes.push(newNote);
						locationCount += 1;

						// ends the for loop since the new note will be the last in the measure
						break;
					}
					else {
						// adds the new note and updates the location
						var newNote = this.makeNote(note.getNote(), note.getSize(), measure, locationCount);
						nextNotes.push(newNote);
						locationCount += 1;

						// updates length and skips notes that are overwriten by the new note
						while (lengthChange > 0) {
							i += 1;
							totalLength += this.getNote(i).getSize();
							lengthChange -= this.getNote(i).getSize()
						}

						//gets the remainder of the last note that was writen over
						lengthChange = Math.abs(lengthChange);

						//pushes a new note with the remaining space of the old note
						newNote = this.makeNote(this.getNote(i).state.note, lengthChange, measure, locationCount);
						nextNotes.push(newNote);
						locationCount += 1;
					}
				}
				// if the new note is shorter than the old one, leave part of the old note
				else if (lengthChange <= 0) {
					// adds the new note and updates the location
					var newNote = this.makeNote(note.getNote(), note.getSize(), measure, locationCount);
					nextNotes.push(newNote);
					locationCount += 1;

					// re-adds the old note with the remaining space
					lengthChange = Math.abs(lengthChange)
					newNote = this.makeNote(this.getNote(i).state.note, lengthChange, measure, locationCount);
					nextNotes.push(newNote);
					locationCount += 1;
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
		//here is where the notes are updated nextNotes is just an array of the new notes
		this.state.notes = nextNotes;
	}
	// gets the note at index i
	getNote(i) {
		return this.state.notes[i]
	}
	// directly changes the note at index i
	changeNote(i, component) {
		this.state.notes[i] = component;
	}
}

export default Staff;
