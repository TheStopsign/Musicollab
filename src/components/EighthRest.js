//src/components/EighthRest.js

import React from 'react';
import Note from './Note';
import '../css/EighthRest.css';
import eighthRest from '../assetts/eighth-rest.svg';

class EighthRest extends Note {
	getSize() {
		return 4;
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
