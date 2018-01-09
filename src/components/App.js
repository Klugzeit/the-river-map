import React, { Component } from 'react';
import '../css/App.css';

import MainPanel from './MainPanel'
import SidePanel from './SidePanel'
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
      monthRange: { min: 5, max: 10 },
      hostelId: 1
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
  handleMarkerClick(markerInfo) {
    console.log('Marker Info: ', markerInfo);
    //TODO: Update state here...
  }
  render() {
    return (
      <div className="App">
        <MainPanel
          onFilterChange={this.handleFilterChange.bind(this)}
          defaultSliderRange={this.state.monthRange}
          onSliderChange={this.handleSliderChange.bind(this)}/>
        <MapPanel />
        <SidePanel
          hostelId={this.state.hostelId} />
        <MapPanel onMarkerClick={this.handleMarkerClick.bind(this)} />  
        <FooterPanel />
      </div>
    );
  }
}

export default App;
