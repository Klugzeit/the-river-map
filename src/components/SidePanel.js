import React, { Component } from 'react';
import '../css/App.css';

class SidePanel extends Component {
  render() {
    return (
      <div className="sidePanelContainer">
        <header> Warm Heart Guesthouse </header>
        <img src="hostels/qrtest.jpg" alt="img" width="306" height="261"/>
        <header1> About us </header1>
        <p> Create React App is divided into two packages, create-react-app is a global command-line utility that you use to create new projects. react-scripts is a development dependency in the generated projects (including this one). </p>
        <header1> Contact </header1>
    </div>
    );
  }
}

export default SidePanel;
