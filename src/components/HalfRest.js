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
			<div className={"note halfnote " + this.state.note} id="16">
				{/* note puts the rest in the right spot on the page halfrest is for figuring out which note it is */}
				{/* measure and location are both for the note logic  */}
				{/* vlineInvis makes small notes/ rests clickable in the same way bigger notes are */}
				<div className={"vlineInvis measure:" + this.state.measure + " location:" + this.state.location}></div>
				<div className={"half_rest measure:" + this.state.measure + " location:" + this.state.location}></div>
				<div className="dots">{this.getDots()}</div>
			</ div>
		);
	}
}

export default HalfRest;
