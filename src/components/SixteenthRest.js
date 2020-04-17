//src/components/SixteenthRest.js

import React from 'react';
import Note from './Note';
import '../css/SixteenthRest.css';
import sixteenthRest from '../assetts/sixteenth-rest.svg';

class SixteenthRest extends Note {
	getSize() {
		var size = 2;
		var dots = this.getDots().length;
		var dotValue = 1;
		while (dots > 0) {
			size += dotValue;
			dotValue /= 2;
			dots -= 1;
		}
		return size;
	}
	render() {
		return (
			<div className={"note sixteenthrest " + this.state.note} id="2">
				{/* note puts the rest in the right spot on the page sixteenthrest is for figuring out which note it is */}
				{/* measure and location are both for the note logic  */}
				<img src={sixteenthRest} className={"sixteenth_rest measure:" + this.state.measure + " location:" + this.state.location} />
				<div className="dots special">{this.getDots()}</div>
			</ div>
		);
	}
}

export default SixteenthRest;
