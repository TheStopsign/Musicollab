//src/components/HalfRest.js

import React from 'react';
import Note from './Note';
import '../css/HalfRest.css';

class HalfRest extends Note {
	getSize() {
		var size = 16;
		var dots = this.getDots().length;
		var dotValue = 8;
		while (dots > 0) {
			size += dotValue;
			dotValue /= 2;
			dots -= 1;
		}
		return size;
	}
	render() {
		return (
			<div className={"note halfnote " + this.state.note} id="16">
				{/* note puts the rest in the right spot on the page halfrest is for figuring out which note it is */}
				{/* measure and location are both for the note logic  */}
				{/* vlineInvis makes small notes/ rests clickable in the same way bigger notes are */}
				<div className={"vlineInvis measure:" + this.state.measure + " location:" + this.state.location + " instrument:" + this.state.instrument}></div>
				<div className={"half_rest measure:" + this.state.measure + " location:" + this.state.location + " instrument:" + this.state.instrument}></div>
				<div className="dots">{this.getDots()}</div>
			</ div>
		);
	}
}

export default HalfRest;
