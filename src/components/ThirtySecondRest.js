//src/components/ThirtySecondRest.js

import React from 'react';
import Note from './Note';
import '../css/ThirtySecondRest.css';
import thirtySecondRest from '../assetts/thirtysecond-rest.svg';

class ThirtySecondRest extends Note {
	getSize() {
		return 1;
	}
	render() {
		return (
			<div className={"note thirtysecondrest " + this.state.note} id="1">
				{/* note puts the rest in the right spot on the page thirtysecondrest is for figuring out which note it is */}
				{/* measure and location are both for the note logic  */}
				<img src={thirtySecondRest} className={"thirtysecond_rest measure:" + this.state.measure + " location:" + this.state.location} />
				<div className="dots special">{this.getDots()}</div>
			</ div>
		);
	}
}

export default ThirtySecondRest;
