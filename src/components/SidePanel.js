import React, { Component } from 'react';
import '../css/App.css';

class SidePanel extends Component {
  render() {
    return (
      <div className="sidePanelContainer">
        <h1> {this.props.marker.title} </h1>
        <img src={this.props.marker.image} alt="img" />
        <h2> About us </h2>
        <div dangerouslySetInnerHTML={{__html: this.props.marker.info}}></div>
        <h2> Contact </h2>
     </div>
    );
  }
}

export default SidePanel;
