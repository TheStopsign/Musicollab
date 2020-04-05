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
  render(i) {
    return (
      this.state.notes[i].render()
    );
  }
  constructor(props) {
    super(props);
    this.state = {
      index: null,
      init_notes: "",
      notes: [new EighthNote({ note: "E" }), new QuarterNote({ note: "E" }), new HalfNote({ note: "E" }), new WholeNote({ note: "E" })]
    }
  }
  getNote(i) {
    return this.state.notes[i]
  }

}

export default NoteTB;
