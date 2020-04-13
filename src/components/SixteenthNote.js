//src/components/Note.js

import React from 'react';
import Note from './Note';
import '../css/SixteenthNote.css';
import Flag from './Flag'

class SixteenthNote extends Note {
	getSize() {
		return 2;
	}
	render() {
		return (
			<div className={"flagnote " + this.state.note}>
				<div className={"note sixteenthnote measure:" + this.state.measure + " location:" + this.state.location} id="2">
					<div className={"vline measure:" + this.state.measure + " location:" + this.state.location}></div>
					<div className={"circle measure:" + this.state.measure + " location:" + this.state.location}></div>
				</ div>
				<Flag />
				<Flag />
			</div>
		);
	}
}

export default SixteenthNote;
