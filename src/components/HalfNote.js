//src/components/Note.js

import React from 'react';
import Note from './Note';
import '../css/HalfNote.css';

class HalfNote extends Note {
	getSize() {
		var size = 16;
		var dots = this.getDots().length;
		var dotValue = 8;
		while (dots > 0) {
			size += dotValue;
			dotValue /= 2;
			dots -= 1;
		}
		return size;
	}
	render() {
		return (
			<div className={"note halfnote " + this.state.note} id="16">
				{/* note and flagnote put the note in the right spot on the page halfnote is for figuring out which note it is */}
				{/* measure and location are both for the note logic*/}
				<div className={"vline measure:" + this.state.measure + " location:" + this.state.location + " instrument:" + this.state.instrument}></div>
				<div className={"half_circle measure:" + this.state.measure + " location:" + this.state.location + " instrument:" + this.state.instrument}></div>
				<div className="dots">{this.getDots()}</div>
			</ div>
		);
	}
}

export default HalfNote;
