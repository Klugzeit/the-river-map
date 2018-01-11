import React, { Component } from 'react';
import '../css/App.css';

class SidePanel extends Component {
  handleBtnClick(event) {
    this.props.onAddToBasket();
  }
  render() {
    return (
      <div>
        <div className="sidePanelContainer">
          <h1> {this.props.markerInfo.title} </h1>
          <img src={this.props.markerInfo.image} alt="img" />
          <h2> About us </h2>
          <div dangerouslySetInnerHTML={{__html: this.props.markerInfo.info}}></div>
          <h2> Contact </h2>
       </div>
       <button className="addButton" type="button" onClick={this.handleBtnClick.bind(this)}>
          Add to basket</button>
     </div>

    );
  }
}

export default SidePanel;
