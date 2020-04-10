//src/components/Note.js

import React, { Component } from 'react';
import '../css/Note.css';

class Note extends Component {
	constructor(props) {
		super(props)
		this.state = {
			note: props.note,
			offset: 0,
			measure: props.measure,
			location: props.location
		}
	}
	componentDidMount() {
		this.setHeight();
	}
	setNote(newnote) {
		this.setState({ note: newnote });
	}
	getNote() {
		return this.state.note;
	}
	getLocation() {
		return this.state.location;
	}
}

export default Note;