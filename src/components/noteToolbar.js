//src/components/noteToolbar.js

import React, { Component } from 'react';
import '../css/noteToolbar.css';
import Note from './Note';
import WholeNote from './WholeNote';
import HalfNote from './HalfNote';
import QuarterNote from './QuarterNote';
import EighthNote from './EighthNote';
import SixteenthNote from './SixteenthNote';
import ThirtySecondNote from './ThirtySecondNote';
import WholeRest from './WholeRest';
import QuarterRest from './QuarterRest';
import HalfRest from './HalfRest';
import EighthRest from './EighthRest';
import SixteenthRest from './SixteenthRest';
import ThirtySecondRest from './ThirtySecondRest';

class NoteTB extends Component {
  render() {
    return (
      <div className="toolbar">
        {/* render all notes in the notes array under state to the note toolbar */}
        {/* classname space spaces the notes out and id fakenote allows the finding of the notes when clicked */}
        <div className="notes row" id="ntb">
          {
            this.state.notes.map(function (note, i) {
              return <div className="space" id="fakenote" key={i}> {note.render()} </div>
            })
          }
        </div>
      </div >
    );
  }
  constructor(props) {
    super(props);
    this.state = {
      // NTB makes the notes use a class designed for the notetoolbar instead of an actual
      // note value. NTBR is the same but for rests
      notes: [
        new ThirtySecondNote({ note: "NTB" }),
        new SixteenthNote({ note: "NTB" }),
        new EighthNote({ note: "NTB" }),
        new QuarterNote({ note: "NTB" }),
        new HalfNote({ note: "NTB" }),
        new WholeNote({ note: "NTB" }),
        new ThirtySecondRest({ note: "NTBR" }),
        new SixteenthRest({ note: "NTBR" }),
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
