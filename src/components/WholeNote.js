//src/components/WholeNote.js

import React from 'react';
import Note from './Note';
import '../css/WholeNote.css';

class WholeNote extends Note {
	render() {
		return (
			<div className={"note wholenote " + this.state.note}>
				<div className="whole_circle"></div>
			</ div>
		);
	}
}

export default WholeNote;