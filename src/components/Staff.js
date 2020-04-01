//src/components/Staff.js

import React, { Component } from 'react';
import '../css/Staff.css';
import Note from './Note';

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
		this.addNote(new Note)
		this.addNote(new Note)
		this.addNote(new Note)
		this.addNote(new Note)
	}
	addNote(note) {
		let nextNotes = this.state.notes
		nextNotes.push(note)
		this.setState({ notes: nextNotes })
	}
}

export default Staff;
