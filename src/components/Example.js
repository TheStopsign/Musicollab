import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import EditDocument from './EditDocument'
class Example extends Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <a href="#">Print this out!</a>}
          content={() => this.componentRef}
        />
        <EditDocument ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}

export default Example