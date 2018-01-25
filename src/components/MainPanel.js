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
  handleSidePanelCloseBtnClick(event) {
    if (this.props.onSidePanelBtnClick) {
      this.props.onSidePanelBtnClick(event);
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
            marker={this.props.selectedMarker}
            onAddToBasket={this.props.onAddToBasket.bind(this)} 
            onCloseBtnClick={this.handleSidePanelCloseBtnClick.bind(this)} /> : "" }
      </div>
    );
  }
}

export default MainPanel;
