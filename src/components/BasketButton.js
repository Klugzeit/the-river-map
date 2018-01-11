import React, { Component } from 'react';
import '../css/App.css';

class BasketButton extends Component {
  handleBtnClick(event) {
    this.props.onBasketBtnClick();
  }
  render() {
    return (
       <button className="basketButton" type="button" onClick={this.handleBtnClick.bind(this)}>
          basket ( {this.props.basketCount} )</button>
    );
  }
}

export default BasketButton;
