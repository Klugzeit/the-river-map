import React, { Component } from 'react';
import '../css/App.css';

class SidePanel extends Component {
  render() {
    return (
      <div className="sidePanelContainer">
        <h2> {this.props.markerInfo.title} </h2>
        <img src="hostels/qrtest.jpg" alt="img" width="306" height="261"/>
        <h2> About us </h2>
        <div dangerouslySetInnerHTML={{__html: this.props.markerInfo.info}}></div>
        <h2> Contact </h2>
     </div>
    );
  }
}

export default SidePanel;
