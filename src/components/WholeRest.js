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
			<div className={"note wholerest " + this.state.note} id="32">
				{/* note puts the rest in the right spot on the page wholerest is for figuring out which note it is */}
				{/* measure and location are both for the note logic  */}
				{/* vlineInvis makes small notes/ rests clickable in the same way bigger notes are */}
				<div className={"vlineInvis measure:" + this.state.measure + " location:" + this.state.location}></div>
				<div className={"whole_rest measure:" + this.state.measure + " location:" + this.state.location}></div>
				<div className="dots special2">{this.getDots()}</div>
			</ div>
		);
	}
}

export default WholeRest;
