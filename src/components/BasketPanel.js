import React, { Component } from 'react';
import '../css/App.css';

class BasketPanel extends Component {
  handleCloseBasketBtnClick () {
    this.props.onCloseBasketPanel();
  }

  handleRemoveBtnClick(id) {
    this.props.onRemoveBasketElement(id);
  }

  handleContactBtnClick() {
  }

  render() {
    let myList = []
    Object.keys(this.props.basketList).map(mkey => {
      let m = this.props.basketList[mkey];
      myList.push(
        <div className="listElement" key={mkey}>
          <h2> {m.title} </h2>
          <button className="contactButton" type="button" onClick={this.handleContactBtnClick.bind(this)}>
            contact
          </button>
          <button className="removeListElementButton" type="button" onClick={this.handleRemoveBtnClick.bind(this, m.index)}>
            x
          </button>
        </div>  )
    })
    return (
        <div className="basketPanelContainer">
          <h1> Basket </h1>
          {myList}
          <button className="closeBasketButton" type="button" onClick={this.handleCloseBasketBtnClick.bind(this)}>
             x</button>
       </div>
    );
  }
}

export default BasketPanel;
