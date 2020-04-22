import React, { Component } from 'react';

class Instrument extends Component {
	render() {
		return <div></div>
	}
	constructor(props) {
		super(props)
		this.state = {
			name: props.name,
			staffs: [],
			show: false
		}
	}
	getName() {
		return this.state.name;
	}
}

export default Instrument