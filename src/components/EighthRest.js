//src/components/EighthRest.js

import React from 'react';
import Note from './Note';
import '../css/EighthRest.css';
import eighthRest from '../assetts/eighth-rest.svg';

class EighthRest extends Note {
	getSize() {
		var size = 4;
		var dots = this.getDots().length;
		var dotValue = 2;
		while (dots > 0) {
			size += dotValue;
			dotValue /= 2;
			dots -= 1;
		}
		return size;
	}
	render() {
		return (
			<div className={"note eighthrest " + this.state.note} id="4">
				{/* note puts the rest in the right spot on the page eightrest is for figuring out which note it is */}
				{/* measure and location are both for the note logic  */}
				<img src={eighthRest} className={"eighth_rest measure:" + this.state.measure + " location:" + this.state.location} />
				<div className="dots special">{this.getDots()}</div>
			</ div>
		);
	}
}

export default EighthRest;
