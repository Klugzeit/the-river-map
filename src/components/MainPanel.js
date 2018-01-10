import React, { Component } from 'react';
import '../css/App.css';
import FilterButtons from './FilterButtons'
import MonthSlider from './MonthSlider'
import SidePanel from './SidePanel'


class MainPanel extends Component {
  handleSliderChange(value) {
    if (this.props.onSliderChange) {
      this.props.onSliderChange(value);
    }
  }
  render() {
    return (
      <div className="mainPanelContainer">
        <h1>I want to</h1>
        <FilterButtons onFilterChange={this.props.onFilterChange}/>
        <h1>From</h1>
        <MonthSlider
          onSliderChange={this.handleSliderChange.bind(this)} 
          defaultSliderRange={this.props.defaultSliderRange} />
        { this.props.showSidePanel ? <SidePanel
            markerInfo={this.props.currentMarkerInfo} /> : "" }
      </div>
    );
  }
}

export default MainPanel;
