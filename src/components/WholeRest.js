//src/components/WholeRest.js

import React from 'react';
import Note from './Note';
import '../css/WholeRest.css';

class WholeRest extends Note {
	render() {
		return (
			<div className="note">
				<div className="whole_rest"></div>
			</ div>
		);
	}
}

export default WholeRest;