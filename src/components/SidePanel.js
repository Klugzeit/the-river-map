import React, { Component } from 'react';
import '../css/App.css';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'

class SidePanel extends Component {
  handleBtnClick(event) {
    this.props.onAddToBasket();
  }
  render() {
    return (
      <div className="sidePanelContainer">
        <div id='sidePanelInfoContainer'>
          <h1> {this.props.marker.title} </h1>
          <img src={this.props.marker.image} alt="img" />
          <h2> About us </h2>
          <div dangerouslySetInnerHTML={{__html: this.props.marker.info}}></div>
          <h2> Contact </h2>
        </div>
        <div className="addToBasketButton" onClick={this.handleBtnClick.bind(this)}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
    );
  }
}

export default SidePanel;
