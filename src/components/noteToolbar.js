//src/components/noteToolbar.js

import React, { Component } from 'react';
import '../css/noteToolbar.css';
import Note from './Note';
import WholeNote from './WholeNote';
import HalfNote from './HalfNote';
import WholeRest from './WholeRest';
import HalfRest from './HalfRest';
import EighthNote from './EighthNote';
import QuarterNote from './QuarterNote';

class NoteTB extends Component {
  render() {
    return (
      <div className="staff">

        <div className="notes row">
          {
            this.state.notes.map(function (note) {
              return note.render()
            })
          }
        </div>
      </div >
    );
  }
	constructor(props) {
		super(props);
		this.state = {
			index: null,
			init_notes: "",
			notes: [new EighthNote({ note: "G" }),new QuarterNote({ note: "G" }),new HalfNote({ note: "G" }),new WholeNote({ note: "G" })]
		}
	}
	getNote(i) {
		return this.state.notes[i]
	}

}

export default NoteTB;
