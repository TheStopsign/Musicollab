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
			prevStaff: null, //holds prev staff
			nextStaff: null,//holds next staff
			init_notes: "",
			notes: []
		}
	}
	componentDidMount() {
		this.getNotes()
	}
	getNotes() {
		this.addNote(new EighthNote({ note: "B" }))
		this.addNote(new QuarterNote({ note: "C" }))
		this.addNote(new HalfNote({ note: "D" }))
		this.addNote(new WholeNote({ note: "E" }))
		this.addNote(new WholeRest({ note: "F" }))
		this.addNote(new HalfRest({ note: "G" }))
	}
	addNote(note) {
		let nextNotes = this.state.notes
		nextNotes.push(note)
		this.setState({ notes: nextNotes })
	}
}

export default Staff;
