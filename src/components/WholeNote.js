//src/components/WholeNote.js

import React from 'react';
import Note from './Note';
import '../css/WholeNote.css';

class WholeNote extends Note {
	getSize() {
		var size = 32;
		var dots = this.getDots().length;
		var dotValue = 16;
		while(dots > 0) {
			size += dotValue;
			dotValue /= 2;
			dots -= 1;
		}
		return size;
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
