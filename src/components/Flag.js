import React, { Component } from 'react';
import flag from '../assetts/flag.svg'

class Flag extends Component {
	render() {
		return <img className="flag" src={flag}></img>
	}
}

export default Flag;