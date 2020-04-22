//src/components/QuarterNote.js

import React from 'react';
import Note from './Note';
import '../css/QuarterNote.css';

class QuarterNote extends Note {
	getSize() {
		var size = 8;
		var dots = this.getDots().length;
		var dotValue = 4;
		while (dots > 0) {
			size += dotValue;
			dotValue /= 2;
			dots -= 1;
		}
		return size;
	}
	render() {
		return (
			<div className={"note quarternote " + this.state.note} id="8">
				{/* note and flagnote put the note in the right spot on the page quarternote is for figuring out which note it is */}
				{/* measure and location are both for the note logic in  */}
				<div className={"vline measure:" + this.state.measure + " location:" + this.state.location + " instrument:" + this.state.instrument}></div>
				<div className={"circle measure:" + this.state.measure + " location:" + this.state.location + " instrument:" + this.state.instrument}></div>
				<div className="dots">{this.getDots()}</div>
			</ div>
		);
	}
}

export default QuarterNote;
