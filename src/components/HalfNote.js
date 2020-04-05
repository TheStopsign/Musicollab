//src/components/Note.js

import React from 'react';
import Note from './Note';
import '../css/HalfNote.css';

class HalfNote extends Note {
	render() {
		return (
			<div className={"note halfnote " + this.state.note} id="halfnote">
				<div className="vline"></div>
				<div className="half_circle"></div>
			</ div>
		);
	}
}

export default HalfNote;
