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
			location: props.location,
			dots: (props.dots)
		}
	}
	componentDidMount() {

	}
	setNote(newnote) {
		this.setState({ note: newnote })
	}
	getNote() {
		return this.state.note
	}
	getDots() {
		let dots = [];
		for (var i = 0; i < this.state.dots; i++) {
			dots.push(
				<div className="dot" />
			);
		}
		return dots;
	}
}

export default Note;