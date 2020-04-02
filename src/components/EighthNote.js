//src/components/Note.js

import React from 'react';
import Note from './Note';
import '../css/EighthNote.css';
import Flag from './Flag'

class EighthNote extends Note {
	render() {
		return (
			<div className={"flagnote eighthnote " + this.state.note}>
				<div className={"note flagnote eighthnote " + this.state.note}>
					<div className="vline"></div>
					<div className="circle"></div>
				</ div>
				<Flag />
			</div>
		);
	}
}

export default EighthNote;