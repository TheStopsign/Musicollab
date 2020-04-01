//src/components/Note.js

import React, { Component } from 'react';
import '../css/Note.css';

class Note extends Component {
	render() {
		return (
			<div className="note">
				<div className="vline"></div>
				<div className="circle"></div>
			</ div>
		);
	}
	constructor(props) {
		console.log("NOTE CREATED")
		super(props);
		this.state = {
			prevNote: null, //holds prev Note
			nextNote: null,//holds next Note
			note: ""
		}
	}
}

export default Note;