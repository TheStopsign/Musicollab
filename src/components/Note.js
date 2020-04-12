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
			dots: 0 || props.dots
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
			if (i == 0) {
				dots.push(
					<div className="dot first" />
				);
			} else {
				dots.push(
					<div className="dot additional" />
				);
			}
		}
		return dots;
	}
}

export default Note;