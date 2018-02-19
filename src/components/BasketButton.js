import React, { Component } from 'react';
import '../css/App.css';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faIcon from '@fortawesome/fontawesome-free-solid/faMapMarkerAlt'

class BasketButton extends Component {
  handleBtnClick(event) {
    this.props.onBasketBtnClick();
  }
  render() {
    return (
      <div className='basketButtonContainer'>
        <div className='basketButton' onClick={this.handleBtnClick.bind(this)}>
          <FontAwesomeIcon icon={faIcon} size='3x' transform={{ rotate: -10 }} />
        </div>
        <div className='basketCounter'>
          <span> {this.props.basketCount} </span>
        </div>
      </div>
    );
  }
}

export default BasketButton;
