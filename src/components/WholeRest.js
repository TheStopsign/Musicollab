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
			<div className={"note wholerest "+ this.state.note} id="32">
				<div className={"vlineInvis measure:" + this.state.measure + " location:" + this.state.location}></div>
				<div className={"whole_rest measure:" + this.state.measure + " location:" + this.state.location}></div>
			</ div>
		);
	}
}

export default WholeRest;
