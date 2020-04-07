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
              return <div className="space"> { note.render() } </div>
            })
          }
        </div>
      </div >
    );
  }
  constructor(props) {
    super(props);
    this.state = {
      notes: [
        new EighthNote({ note: "NTB" }),
        new QuarterNote({ note: "NTB" }),
        new HalfNote({ note: "NTB" }),
        new WholeNote({ note: "NTB" }),
        new EighthRest({ note: "NTBR" }),
        new QuarterRest({ note: "NTBR" }),
        new HalfRest({ note: "NTBR" }),
        new WholeRest({ note: "NTBR" }),
      ]
    }
  }
  getNote(i) {
    return this.state.notes[i]
  }
}
export default NoteTB;
