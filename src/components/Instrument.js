import React, { Component } from 'react';
import Staff from './Staff'
import '../css/EditDocument.css';

class Instrument extends Component {
	render() {
		return (
			this.state.staffs.map(function (staff) {
				return staff.render()
			})
		)
	}
	constructor(props) {
		super(props)
		this.state = {
			name: props.name,
			staffs: [],
			show: false,
			noteCount: 32, //max amount of notes in one staff
		}
	}
	getName() {
		return this.state.name;
	}
	addNote(measure, newPitch, noteSelection, location) {
		//adds note to the measure and updates render
		let newNote = this.getStaff(measure).makeNote(newPitch, noteSelection, measure, location, this.state.name);
		this.getStaff(measure).addNote(newNote)
		this.setState({ staffs: this.state.staffs }) //update UI
	}
	// add a new staff to the document
	addStaff() {
		let nextStaffs = this.state.staffs
		nextStaffs.push(new Staff({ noteCount: this.state.noteCount, staffNum: this.state.staffs.length, instrument: this.state.name }))
		this.setState({ staffs: nextStaffs })
	}
	// get the ith staff
	getStaff(i) {
		return this.state.staffs[i]
	}
}

export default Instrument
