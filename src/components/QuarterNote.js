//src/components/QuarterNote.js

import React from 'react';
import Note from './Note';
import '../css/QuarterNote.css';

class QuarterNote extends Note {
	getSize() {
		return 8;
	}
	render() {
		return (
			<div className={"note quarternote " + this.state.note} id="8">
				<div className={"vline measure:" + this.state.measure + " location:" + this.state.location}></div>
				<div className={"circle measure:" + this.state.measure + " location:" + this.state.location}></div>
			</ div>
		);
	}
}

export default QuarterNote;
