//src/components/WholeNote.js

import React from 'react';
import Note from './Note';
import '../css/WholeNote.css';

class WholeNote extends Note {
	render() {
		return (
			<div className={"note wholenote " + this.state.note} id="wholenote">
				<div className="vlineInvis"></div>
				<div className="whole_circle"></div>
			</ div>
		);
	}
}

export default WholeNote;
