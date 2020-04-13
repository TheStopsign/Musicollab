//src/components/SixteenthRest.js

import React from 'react';
import Note from './Note';
import '../css/SixteenthRest.css';
import sixteenthRest from '../assetts/sixteenth-rest.svg';

class SixteenthRest extends Note {
	getSize() {
		return 2;
	}
	render() {
		return (
			<div className={"note sixteenthrest " + this.state.note} id="2">
				<img src={sixteenthRest} className={"sixteenth_rest measure:" + this.state.measure + " location:" + this.state.location} />
			</ div>
		);
	}
}

export default SixteenthRest;
