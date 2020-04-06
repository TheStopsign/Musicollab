//src/components/noteToolbar.js

import React, { Component } from 'react';
import '../css/noteToolbar.css';
import Note from './Note';
import WholeNote from './WholeNote';
import HalfNote from './HalfNote';
import QuarterNote from './QuarterNote';
import EighthNote from './EighthNote';
import WholeRest from './WholeRest';
import QuarterRest from './QuarterRest';
import HalfRest from './HalfRest';
import EighthRest from './EighthRest';

class NoteTB extends Component {
  render() {
    return (
      <div className="toolbar">

        <div className="notes row" id="ntb">
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
      notes: [
        new EighthNote({ note: "G" }),
        new QuarterNote({ note: "G" }),
        new HalfNote({ note: "G" }),
        new WholeNote({ note: "G" }),
        new EighthRest({ note: "R" }),
        new QuarterRest({ note: "R" }),
        new HalfRest({ note: "R" }),
        new WholeRest({ note: "R" }),
      ]
    }
  }
  getNote(i) {
    return this.state.notes[i]
  }
}
export default NoteTB;
