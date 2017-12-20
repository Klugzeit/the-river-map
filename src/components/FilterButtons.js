import React, { Component } from 'react';
import '../css/App.css';

import stayIcon from '../assets/icons/stay.png'
import joinIcon from '../assets/icons/join.png'
import meetIcon from '../assets/icons/meet.png'
import workIcon from '../assets/icons/work.png'


class FilterButtons extends Component {
  handleBtnClick(event) {
    this.props.onFilterChange(event, event.target.id);
  }
  render() {
    return (
      <div className="filterButtonsContainer">
        <input
          id="stay"
          className="filterIcon" 
          type="image" 
          src={stayIcon}
          alt="Stay"
          onClick={this.handleBtnClick.bind(this)} />
        <input
          id="meet"        
          className="filterIcon" 
          type="image" 
          src={meetIcon}
          alt="Meet"
          onClick={this.handleBtnClick.bind(this)} />
        <input
          id="work"      
          className="filterIcon" 
          type="image" 
          src={workIcon}
          alt="Work"
          onClick={this.handleBtnClick.bind(this)} />
        <input 
          id="join"        
          className="filterIcon" 
          type="image" 
          src={joinIcon}
          alt="Join"
          onClick={this.handleBtnClick.bind(this)} />
      </div>
    );
  }
}

export default FilterButtons;
