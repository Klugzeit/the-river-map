import React, { Component } from 'react';
import '../css/App.css';

import HeaderPanel from './HeaderPanel'
import FooterPanel from './FooterPanel'
import MapPanel from './MapPanel'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapFilters: {
        stay: true,
        join: true,
        meet: true,
        work: true
      },
      monthRange: { min: 5, max: 10 }
    };
  }
  handleFilterChange(event, btnId) {
    this.setState((prevState) => {
      let newValue = !prevState.mapFilters[btnId];
      let newMapFilters = Object.assign({}, prevState.mapFilters, {[btnId]: newValue});
      return { mapFilters: newMapFilters }
    })  
  }
  handleSliderChange(value) {
    this.setState({monthRange: value});
  }
  render() {
    return (
      <div className="App">
        <HeaderPanel
          onFilterChange={this.handleFilterChange.bind(this)}
          defaultSliderRange={this.state.monthRange}
          onSliderChange={this.handleSliderChange.bind(this)}/>
        <MapPanel />
        <FooterPanel />
      </div>
    );
  }
}

export default App;
