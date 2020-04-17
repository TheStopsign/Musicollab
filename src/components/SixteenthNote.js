//src/components/Note.js

import React from 'react';
import Note from './Note';
import '../css/SixteenthNote.css';
import Flag from './Flag'

class SixteenthNote extends Note {
	getSize() {
		var size = 2;
		var dots = this.getDots().length;
		var dotValue = 1;
		while (dots > 0) {
			size += dotValue;
			dotValue /= 2;
			dots -= 1;
		}
		return size;
	}
	render() {
		return (

			<div className={"flagnote " + this.state.note}>
				{/* note and flagnote put the note in the right spot on the page sixteenthnote is for figuring out which note it is */}
				{/* measure and location are both for the note logic */}
				<div className={"note sixteenthnote measure:" + this.state.measure + " location:" + this.state.location} id="2">
					<div className={"vline measure:" + this.state.measure + " location:" + this.state.location}></div>
					<div className={"circle measure:" + this.state.measure + " location:" + this.state.location}></div>
					<div className="dots">{this.getDots()}</div>
				</ div>
				<Flag />
				<Flag />
			</div>
		);
	}
}

export default SixteenthNote;
