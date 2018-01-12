import React, { Component } from 'react';
import '../css/App.css'; 

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone'

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
    let basketElements = Object.keys(this.props.basketList).map(mkey => {
      let m = this.props.basketList[mkey];
      return (
        <li className="basketListElement" key={mkey}>
          <div id='basketItemImg'>
            <img  src={m.image} alt={m.title} />
          </div>
          <div id='basketInfoBox'>
            <div id='basketElementTitle'>
              <h2> {m.title} </h2>
            </div>
            <div className='basketElementButtons'>
              <div className='basketBtn'>
                <FontAwesomeIcon 
                  className='basketBtn'
                  id="contactBasketElementButton"
                  onClick={this.handleContactBtnClick.bind(this)}
                  icon={faPhone} />
              </div>
              <div className='basketBtn'>
                <FontAwesomeIcon
                  onClick={this.handleRemoveBtnClick.bind(this, m.key)}
                  icon={faTimes} />
              </div>
            </div>
          </div>
        </li>  )
    })
    return (
        <div className="basketPanelContainer">
          <h1> Basket </h1>
          <FontAwesomeIcon
            className='basketBtn'
            id="closeBasketButton"
            onClick={this.handleCloseBasketBtnClick.bind(this)}
            icon={faTimes} />
          <ul className='basketListContainer'>
            {basketElements}
          </ul>
       </div>
    );
  }
}

export default BasketPanel;
