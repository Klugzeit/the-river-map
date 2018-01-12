import React, { Component } from 'react';
import '../css/App.css';

import MainPanel from './MainPanel'
import MapPanel from './MapPanel'
import mapData from './db-final'
import BasketPanel from './BasketPanel'
import BasketButton from './BasketButton'

class App extends Component {

  constructor(props) {
    super(props);

    this.defaultMapIcon = {
      path: 'M0,50 A50,50,0 1 1 100,50 A50,50,0 1 1 0,50 Z',
      fillColor: '#ff8a65',
      fillOpacity: 0.8,
      scale: 0.18,
      strokeColor: '#ff8a65'
    }

    this.selectedMapIcon = {
      path: 'M0,50 A50,50,0 1 1 100,50 A50,50,0 1 1 0,50 Z',
      fillColor: '#62d2c3',
      fillOpacity: 1,
      scale: 0.18,
      strokeColor: '#62d2c3'
    }

    this.state = {
      mapFilters: {
        stay: true,
        join: true,
        meet: true,
        work: true
      },
      monthRange: { min: 5, max: 10 },
      showSidePanel: false,
      mapMarkers: this.buildMapMarkers(mapData),
      selectedMarker: {},
      showBasketPanel: false,
      currentMarker: {},
      basketList: {},
      basketCount: 0
    };
  }

  buildMapMarkers(mapData) {
    let features = mapData.features;
    let markers = {};

    // Populate map markers
    for (let i=0; i < features.length; i++) {
      let geo = features[i].geometry
      let index = i;
      
      let marker = {
        key: index,
        lat: geo.coordinates[0],
        lng: geo.coordinates[1],
        icon: this.defaultMapIcon,
        title: features[i].properties.title,
        info: features[i].properties.information,
        image: features[i].properties.image
      }

      markers[index] = marker;
    }

    return markers;
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
    this.setState((prevState) => {
      // Set active marker icon back to default
      if (Object.keys(prevState.selectedMarker).length !== 0) {
        prevState.mapMarkers[prevState.selectedMarker.key].icon = this.defaultMapIcon;
      }
      return { 
        showSidePanel: false,
        selectedMarker: {}
      };
    });
  }

  handleMarkerClick(marker, event) {
    this.setState((prevState) => {
      // Set active marker icon back to default      
      if (Object.keys(prevState.selectedMarker).length !== 0) {
        prevState.mapMarkers[prevState.selectedMarker.key].icon = this.defaultMapIcon;
      }
      // Change the icon for the clicked marker
      let newMarkers = Object.assign({}, prevState.mapMarkers);
      newMarkers[marker.key].icon = this.selectedMapIcon;

      return { 
        markers: newMarkers, 
        selectedMarker: marker,
        showSidePanel: true,
        currentMarker: marker
      };
    })
  }

  handleAddToBasket() {
    var newBasket = Object.assign({}, this.state.basketList);
    newBasket[this.state.currentMarker.key] = this.state.currentMarker;
    var count = Object.keys(newBasket).length;
    console.log(count)
    this.setState({
      basketList: newBasket,
      basketCount: count
    });
  }

  handleBasketBtnClick() {
    this.setState({
      showBasketPanel: true
    });
  }

  closeBasketPanel() {
    this.setState({
      showBasketPanel: false
    });
  }

  handleRemoveBasketElementBtnClick(id) {
    var newBasket = Object.assign({}, this.state.basketList);
    delete newBasket[id];
    var count = Object.keys(newBasket).length;
    this.setState({
      basketList: newBasket,
      basketCount: count
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
          onAddToBasket={this.handleAddToBasket.bind(this)}
          currentMarker={this.state.currentMarker} />
        <MapPanel
          mapData={this.state.mapData}
          mapMarkers={this.state.mapMarkers}
          onMapClick={this.handleMapClick.bind(this)}
          onMarkerClick={this.handleMarkerClick.bind(this)} />

        { this.state.showBasketPanel ? <BasketPanel
          basketList={this.state.basketList}
          onCloseBasketPanel={this.closeBasketPanel.bind(this)}
          onRemoveBasketElement={this.handleRemoveBasketElementBtnClick.bind(this)}/> : "" }

        <BasketButton
          onBasketBtnClick={this.handleBasketBtnClick.bind(this)}
          basketCount={this.state.basketCount}
        />
      </div>
    );
  }
}

export default App;
