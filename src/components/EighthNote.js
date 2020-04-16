//src/components/Note.js

import React from 'react';
import Note from './Note';
import '../css/EighthNote.css';
import Flag from './Flag'

class EighthNote extends Note {
	getSize() {
		var size = 4;
		var dots = this.getDots().length;
		var dotValue = 2;
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
				<div className={"note eighthnote measure:" + this.state.measure + " location:" + this.state.location} id="4">
					<div className={"vline measure:" + this.state.measure + " location:" + this.state.location}></div>
					<div className={"circle measure:" + this.state.measure + " location:" + this.state.location}></div>
					<div className="dots">{this.getDots()}</div>
				</ div>
				<Flag />
			</div>
		);
	}
}

export default EighthNote;
