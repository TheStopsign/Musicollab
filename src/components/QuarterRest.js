//src/components/HalfRest.js

import React from 'react';
import Note from './Note';
import '../css/QuarterRest.css';
import quarterRest from '../assetts/quarter-rest.svg';

class QuarterRest extends Note {
	getSize() {
		return 8;
	}
	render() {
		return (
			<div className={"note quarterrest " + this.state.note} id="8">
				{/* note puts the rest in the right spot on the page wholerest is for figuring out which note it is */}
				{/* measure and location are both for the note logic  */}
				<img src={quarterRest} className={"quarter_rest measure:" + this.state.measure + " location:" + this.state.location} />
				<div className="dots special">{this.getDots()}</div>
			</ div>
		);
	}
}

export default QuarterRest;
