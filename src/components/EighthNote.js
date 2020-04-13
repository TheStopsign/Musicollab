//src/components/Note.js

import React from 'react';
import Note from './Note';
import '../css/EighthNote.css';
import Flag from './Flag'

class EighthNote extends Note {
	getSize() {
		return 4;
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
