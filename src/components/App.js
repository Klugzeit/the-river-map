import React, { Component } from 'react';
import '../css/App.css';

import MainPanel from './MainPanel'
import SidePanel from './SidePanel'
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
      showSidePanel: false,
      currentMarkerInfo: {title: 'Hello', information: 'Create React App is divided into two packages, create-react-app is a global command-line utility that you use to create new projects. react-scripts is a development dependency in the generated projects (including this one).'}
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
    // console.log('Marker Info: ', markerInfo);
    this.setState({
      showSidePanel: true,
      currentMarkerInfo: markerInfo
    });
  }
  render() {
    return (
      <div className="App">
        <MainPanel
          onFilterChange={this.handleFilterChange.bind(this)}
          defaultSliderRange={this.state.monthRange}
          onSliderChange={this.handleSliderChange.bind(this)} />
        { this.state.showSidePanel ? <SidePanel
          markerInfo={this.state.currentMarkerInfo} /> : "" }
        <MapPanel onMarkerClick={this.handleMarkerClick.bind(this)} />  
      </div>
    );
  }
}

export default App;
