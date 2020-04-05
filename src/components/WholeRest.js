//src/components/WholeRest.js

import React from 'react';
import Note from './Note';
import '../css/WholeRest.css';

class WholeRest extends Note {
	getSize() {
		return 32;
	}
	render() {
		return (
			<div className="note">
				<div className={"whole_rest measure:" + this.state.measure + " location:" + this.state.location}></div>
			</ div>
		);
	}
}

export default WholeRest;