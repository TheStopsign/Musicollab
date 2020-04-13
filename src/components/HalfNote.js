//src/components/Note.js

import React from 'react';
import Note from './Note';
import '../css/HalfNote.css';

class HalfNote extends Note {
	getSize() {
		return 16;
	}
	render() {
		return (
			<div className={"note halfnote " + this.state.note} id="16">
				<div className={"vline measure:" + this.state.measure + " location:" + this.state.location}></div>
				<div className={"half_circle measure:" + this.state.measure + " location:" + this.state.location}></div>
				<div className="dots">{this.getDots()}</div>
			</ div>
		);
	}
}

export default HalfNote;
