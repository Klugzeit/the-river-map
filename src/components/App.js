import React, { Component } from 'react';
import '../css/App.css';

import MainPanel from './MainPanel'
import MapPanel from './MapPanel'
import mapData from './db-final'


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
      mapData: mapData,
      monthRange: { min: 5, max: 10 },
      showSidePanel: false,
      currentMarkerInfo: {}
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

  handleMapClick(event) {
    this.setState({
      showSidePanel: false,
      currentMarkerInfo: {}
    });
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
          onSliderChange={this.handleSliderChange.bind(this)} 
          showSidePanel={this.state.showSidePanel} 
          currentMarkerInfo={this.state.currentMarkerInfo} />
        <MapPanel 
          mapData={this.state.mapData}
          onMapClick={this.handleMapClick.bind(this)}
          onMarkerClick={this.handleMarkerClick.bind(this)} />  
      </div>
    );
  }
}

export default App;
