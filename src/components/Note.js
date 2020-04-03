//src/components/Note.js

import React, { Component } from 'react';
import '../css/Note.css';

class Note extends Component {
	constructor(props) {
		super(props)
		this.state = {
			note: props.note,
			offset: 0
		}
	}
	componentDidMount() {
		this.setHeight()
	}
	setNote(newnote) {
		this.setState({ note: newnote })
	}
	getNote() {
		return this.state.note
	}
}

export default Note;