//src/components/Note.js

import React from 'react';
import Note from './Note';
import '../css/HalfNote.css';

class HalfNote extends Note {
	getSize() {
		var size = 16;
		var dots = this.getDots().length;
		var dotValue = 8;
		while(dots > 0) {
			size += dotValue;
			dotValue /= 2;
			dots -= 1;
		}
		return size;
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
