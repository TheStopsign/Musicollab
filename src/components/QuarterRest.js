//src/components/HalfRest.js

import React from 'react';
import Note from './Note';
import '../css/QuarterRest.css';
import quarterRest from '../assetts/quarter-rest.svg';

class QuarterRest extends Note {
	getSize() {
		var size = 8;
		var dots = this.getDots().length;
		var dotValue = 4;
		while (dots > 0) {
			size += dotValue;
			dotValue /= 2;
			dots -= 1;
		}
		return size;
	}
	render() {
		return (
			<div className={"note quarterrest " + this.state.note} id="8">
				{/* note puts the rest in the right spot on the page wholerest is for figuring out which note it is */}
				{/* measure and location are both for the note logic  */}
				<img src={quarterRest} className={"quarter_rest measure:" + this.state.measure + " location:" + this.state.location + " instrument:" + this.state.instrument} />
				<div className="dots special">{this.getDots()}</div>
			</ div>
		);
	}
}

export default QuarterRest;
