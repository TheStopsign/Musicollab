//src/components/WholeRest.js

import React from 'react';
import Note from './Note';
import '../css/WholeRest.css';

class WholeRest extends Note {
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
			<div className={"note wholerest " + this.state.note} id="32">
				{/* note puts the rest in the right spot on the page wholerest is for figuring out which note it is */}
				{/* measure and location are both for the note logic  */}
				{/* vlineInvis makes small notes/ rests clickable in the same way bigger notes are */}
				<div className={"vlineInvis measure:" + this.state.measure + " location:" + this.state.location}></div>
				<div className={"whole_rest measure:" + this.state.measure + " location:" + this.state.location}></div>
				<div className="dots special2">{this.getDots()}</div>
			</ div>
		);
	}
}

export default WholeRest;
