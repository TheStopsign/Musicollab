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
			<div className={"note wholenote " + this.state.note} id="32">
				<div className={"vlineInvis measure:" + this.state.measure + " location:" + this.state.location}></div>
				<div className={"whole_circle measure:" + this.state.measure + " location:" + this.state.location}></div>
				<div className="dots">{this.getDots()}</div>
			</ div>
		);
	}
}

export default WholeNote;
