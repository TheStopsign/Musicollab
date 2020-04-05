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
			<div className={"note halfnote " + this.state.note}>
				<div className={"vline measure:" + this.state.measure + " location:" + this.state.location}></div>
				<div className={"half_circle measure:" + this.state.measure + " location:" + this.state.location}></div>
			</ div>
		);
	}
}

export default HalfNote;