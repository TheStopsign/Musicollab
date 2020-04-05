//src/components/HalfRest.js

import React from 'react';
import Note from './Note';
import '../css/HalfRest.css';

class HalfRest extends Note {
	getSize() {
		return 16;
	}
	render() {
		return (
			<div className="note">
				<div className={"half_rest measure:" + this.state.measure + " location:" + this.state.location}></div>
			</ div>
		);
	}
}

export default HalfRest;