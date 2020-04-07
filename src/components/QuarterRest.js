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
			<div className={"note quarterrest "+ this.state.note} id="8">
				<img src={quarterRest} className={"quarter_rest measure:" + this.state.measure + " location:" + this.state.location} />
			</ div>
		);
	}
}

export default QuarterRest;
