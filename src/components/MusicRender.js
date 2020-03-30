import Vex from 'vexflow';
import React, { Component } from 'react';

const VF = Vex.Flow;

export default class MusicRender extends Component {
	render() {
		return (
			<div ref="outer" style={{
				padding: 10,
				display: "inline-block",
				backgroundColor: 'white',
			}}>
			</div>
		);
	}
	componentDidMount() {
		const svgContainer = document.createElement('div');
		const { notes } = this.props;
		var vf = new VF.Factory({
			renderer: { elementId: svgContainer, width: 500, height: 200 }
		});
		var score = vf.EasyScore();
		var system = vf.System();

		system.addStave({
			voices: [
				score.voice(score.notes(notes)),
			]
		}).addClef('treble').addTimeSignature('4/4');

		vf.draw();
		this.refs.outer.appendChild(svgContainer);
	}
}