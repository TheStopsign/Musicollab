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
		let n = 0;
		switch (props) {
			case "wholenote":
				n = new WholeNote({ note: "D" });
				break;
			case "halfnote":
				n = new HalfNote({ note: "D" });
				break;
			case "quarternote":
				n = new QuarterNote({ note: "D" });
				break;
			case "eighthnote":
				n = new EighthNote({ note: "D" });
				break;
			default:
				n = new WholeRest({ note: "D" });

		}
		this.state = {
			index: null,
			init_notes: "",
			notes: [n]
		}
	}
	addNote(note) {
		let nextNotes = this.state.notes
		nextNotes.push(note)
		this.setState({ notes: nextNotes })
	}
	getNote(i) {
		return this.state.notes[i]
	}
	changeNote(i, component) {
		this.state.notes[i] = component;
	}
}

export default Staff;
