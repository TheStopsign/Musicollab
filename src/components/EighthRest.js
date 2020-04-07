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
			<div className={"note eighthrest "+ this.state.note} id="4">
				<img src={eighthRest} className={"eighth_rest measure:" + this.state.measure + " location:" + this.state.location} />
			</ div>
		);
	}
}

export default EighthRest;
