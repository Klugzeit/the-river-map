import React, { Component } from 'react';
import '../css/App.css';

import stayIcon from '../assets/icons/stay.png'
import joinIcon from '../assets/icons/join.png'
import meetIcon from '../assets/icons/meet.png'
import createIcon from '../assets/icons/create.png'


class FilterButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stay: {
        name: 'Stay',
        id: 'stay',
        className: 'filterIcon active', 
        src: stayIcon,
        active: true,
      },
      meet: {
        name: 'Meet',
        id: 'meet',
        className: 'filterIcon active', 
        src: meetIcon,
        active: true,
      },
      create: {
        name: 'Create',
        id: 'create',
        className: 'filterIcon active', 
        src: createIcon,
        active: true,
      },
      join: {
        name: 'Join',
        id: 'join',
        className: 'filterIcon active', 
        src: joinIcon,
        active: true,
      }
    }
  }

  handleBtnClick(event) {
    event.persist(); // Keep event around for setState
    
    this.setState((prevState) => {
      let curBtn = prevState[event.target.id];
      // Pass our button ID to to this element prop handler
      this.props.onFilterChange(event, event.target.id);
      // Create new btn object
      let newBtn = Object.assign({}, curBtn, {
        active: !curBtn.active,
        className: curBtn.active ? 'filterIcon disabled' : 'filterIcon active'
      });

      return { [event.target.id]: newBtn };
    })
  }

  render() {

    let buttons = [];
    for (let key in this.state) {
      let btn = this.state[key];
      buttons.push(
        <input
          id={btn.id}
          key={btn.id}
          className={btn.className}
          type="image"
          src={btn.src}
          alt={btn.name}
          onClick={this.handleBtnClick.bind(this)}
          />
      )
      
    }

    return (
      <div className="filterButtonsContainer">
        {buttons}
        <ul className="help1">
          <li> <img src={stayIcon}/> Stay: You can sleep here, connect with other travelers, & explore spirituality with them</li>
          <li> <img src={meetIcon}/> Meet: You can come spend the day here, meet other travelers, explore spirtual practices, & talk about spirituality</li> 
          <li> <img src={createIcon}/> Create: You can volunteer here. Come garden, work on the farm, or clean in exchange for a place to stay</li> 
          <li>< img src={joinIcon}/> Join: You can join this community in hosting meals, in guiding Christ- centered spirtual practices & in creating a beautiful space</li> 
        </ul>
      </div>
    );
  }
}

export default FilterButtons;
