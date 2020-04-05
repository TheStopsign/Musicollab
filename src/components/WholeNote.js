//src/components/WholeNote.js

import React from 'react';
import Note from './Note';
import '../css/WholeNote.css';

class WholeNote extends Note {
	getSize() {
		return 32;
	}
	render() {
		return (
			<div className={"note wholenote " + this.state.note}>
				<div className={"whole_circle measure:" + this.state.measure + " location:" + this.state.location}></div>
			</ div>
		);
	}
}

export default WholeNote;