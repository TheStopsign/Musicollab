//src/components/QuarterNote.js

import React from 'react';
import Note from './Note';
import '../css/QuarterNote.css';

class QuarterNote extends Note {
	render() {
		return (
			<div className={"note quarternote " + this.state.note} id="quarternote">
				<div className="vline"></div>
				<div className="circle"></div>
			</ div>
		);
	}
}

export default QuarterNote;
