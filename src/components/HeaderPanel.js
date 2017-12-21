import React, { Component } from 'react';
import '../css/App.css';
import FilterButtons from './FilterButtons'
import MonthSlider from './MonthSlider'


class HeaderPanel extends Component {
  handleSliderChange(value) {
    if (this.props.onSliderChange) {
      this.props.onSliderChange(value);
    }
  }
  render() {
    return (
      <header className="headerContainer">
        <FilterButtons onFilterChange={this.props.onFilterChange}/>
        <MonthSlider
          onSliderChange={this.handleSliderChange.bind(this)} 
          defaultSliderRange={this.props.defaultSliderRange} />
      </header>
    );
  }
}

export default HeaderPanel;
