//src/components/Note.js

import React from 'react';
import Note from './Note';
import '../css/ThirtySecondNote.css';
import Flag from './Flag'

class ThirtySecondNote extends Note {
	getSize() {
		return 1;
	}
	render() {
		return (
			<div className={"flagnote " + this.state.note}>
				{/* note and flagnote put the note in the right spot on the page thirtysecondnote is for figuring out which note it is */}
				{/* measure and location are both for the note logic */}
				<div className={"note thirtysecondnote measure:" + this.state.measure + " location:" + this.state.location + " instrument:" + this.state.instrument} id="1">
					<div className={"vline measure:" + this.state.measure + " location:" + this.state.location + " instrument:" + this.state.instrument}></div>
					<div className={"circle measure:" + this.state.measure + " location:" + this.state.location + " instrument:" + this.state.instrument}></div>
					<div className="dots">{this.getDots()}</div>
				</ div>
				<Flag />
				<Flag />
				<Flag />
			</div>
		);
	}
}

export default ThirtySecondNote;
