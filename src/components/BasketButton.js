import React, { Component } from 'react';
import '../css/App.css';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPlane from '@fortawesome/fontawesome-free-solid/faPlane'

class BasketButton extends Component {
  handleBtnClick(event) {
    this.props.onBasketBtnClick();
  }
  render() {
    return (
      <div className='basketButtonContainer'>
        <div className='basketButton' onClick={this.handleBtnClick.bind(this)}>
          <FontAwesomeIcon icon={faPlane} size='3x' transform={{ rotate: -45 }} />
        </div>
        <div className='basketCounter'>
          <span> {this.props.basketCount} </span>
        </div>
      </div>
    );
  }
}

export default BasketButton;
