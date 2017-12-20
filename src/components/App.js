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
      }
    };
  }
  handleFilterChange(event, btnId) {
    this.setState((prevState) => {
      let newValue = !prevState.mapFilters[btnId];
      let newMapFilters = Object.assign({}, prevState.mapFilters, {[btnId]: newValue});
      return { mapFilters: newMapFilters }
    })
  }
  render() {
    return (
      <div className="App">
        <HeaderPanel onFilterChange={this.handleFilterChange.bind(this)}/>
        <MapPanel />
        <FooterPanel />        
      </div>
    );
  }
}

export default App;
