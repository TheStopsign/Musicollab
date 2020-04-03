import React, { Component } from 'react';
import flag from '../assetts/flag.svg'

class Flag extends Component {
	render() {
		return <img className="flag" src={flag} height="80px"></img>
	}
}

export default Flag;