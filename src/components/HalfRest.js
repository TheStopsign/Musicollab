//src/components/HalfRest.js

import React from 'react';
import Note from './Note';
import '../css/HalfRest.css';

class HalfRest extends Note {
	render() {
		return (
			<div className="note">
				<div className="half_rest"></div>
			</ div>
		);
	}
}

export default HalfRest;