import React, { Component } from 'react';
import '../css/App.css';

import MainPanel from './MainPanel'
import MapPanel from './MapPanel'
import mapData from './dbHostels'
import colorData from './dbColors'
import BasketPanel from './BasketPanel'
import BasketButton from './BasketButton'
import MainMenu from './MainMenu'


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mapFilters: {
        stay: true,
        join: true,
        meet: true,
        create: true
      },
      monthRange: { min: 1, max: 12 },
      showSidePanel: false,
      mapMarkers: this.buildMapMarkers(mapData),
      selectedMarker: {},
      showBasketPanel: false,
      basketList: {},
      basketCount: 0
    };
  }

  componentWillMount() {
    let basketList = JSON.parse(localStorage.getItem('basketList'));
    if (basketList) {
      this.setState({
        basketList: basketList,
        basketCount: Object.keys(basketList).length
      })
    }
  }

  buildMapMarkers(mapData) {
    let features = mapData.features;
    let markers = {};

    // Populate map markers
    for (let i=0; i < features.length; i++) {
      let geo = features[i].geometry
      let index = i;
      
      // initialize marker without icon
      let marker = {
        key: index,
        lat: geo.coordinates[0],
        lng: geo.coordinates[1],
        open: features[i].properties.open,
        close: features[i].properties.close,
        type: features[i].properties.type,
        icon: null,
        color: features[i].properties['marker-color'],
        title: features[i].properties.title,
        /*info: features[i].properties.information,*/
        place: features[i].properties.place,
        website: features[i].properties.website,
        booking: features[i].properties.booking,
        season: features[i].properties.season,
        address: features[i].properties.address,
        image: features[i].properties.image,
        categories: features[i].properties.categories,
        icons: features[i].properties.icons,
        more: features[i].properties.more,
        description: features[i].properties.description,
        volunteer: features[i].properties.volunteer
      }

      // build icon with marker object
      marker.icon = this.getMarkerIcon(marker)

      markers[index] = marker;
    }

    return markers;
  }

  /*
    Return default icon on first render
    param marker: required, holds color information
    param select: Always return selected icon
   */
  getMarkerIcon(marker, select=false) {
    const defaultColor = {
      default: "#ff8a65",
      selected: "#62d2c3"
    }

    let color = colorData
      .colors.find(({ name }) => name === marker.color) || defaultColor

    let defaultIcon = {
      path: 'M0,50 A50,50,0 1 1 100,50 A50,50,0 1 1 0,50 Z',
      fillColor: color.default,
      fillOpacity: 0.8,
      scale: 0.18,
      strokeColor: color.default
    }

    let selectedIcon = {
      path: 'M0,50 A50,50,0 1 1 100,50 A50,50,0 1 1 0,50 Z',
      fillColor: color.selected,
      fillOpacity: 1,
      scale: 0.18,
      strokeColor: color.selected
    }

    let disabledIcon = {
      path: 'M0,50 A50,50,0 1 1 100,50 A50,50,0 1 1 0,50 Z',
      fillColor: color.default,
      fillOpacity: 0.2,
      scale: 0.18,
      strokeColor: color.default
    }

    // return defaultIcon on first render
    if (!marker || !this.state) {
      return defaultIcon;
    }

    if (select) {
      return selectedIcon;
    }

    if (marker.open <= this.state.monthRange.min && 
        marker.close >= this.state.monthRange.max) {
      // This hostel open during the user selected range
      return defaultIcon;
    } else {        
      return disabledIcon;
    }

  }

  handleFilterChange(event, btnId) {

    // Clone markers object
    let allMarkers = this.buildMapMarkers(mapData);
    let newMarkers = {};

    this.setState((prevState) => {
      let newValue = !prevState.mapFilters[btnId];
      let newMapFilters = Object.assign({}, prevState.mapFilters, {[btnId]: newValue});

      for (let key in allMarkers) {
        let m = allMarkers[key];
        
        for (let i=0; i<m.categories.length; i++) {
          let categoryName = m.categories[i];

          if (newMapFilters[categoryName]) {
            let newMarker = JSON.parse(JSON.stringify(m));
            console.log(newMarker);
            
            newMarkers[newMarker.key] = newMarker;
          }
        }
      }

      return { 
        mapFilters: newMapFilters,
        mapMarkers: newMarkers
      }
    })
  }

  handleSliderChange(value) {
    // Clone markers object
    let markers = JSON.parse(JSON.stringify(this.state.mapMarkers));

    // Rebuild marker dictionary according to new filter
    for (let key in markers) {
      markers[key].icon = this.getMarkerIcon(markers[key]);
    }
    
    this.setState({
      mapMarkers: markers,
      monthRange: value
    });
  }

  handleMapClick(event) {
    this.setState((prevState) => {
      // Set active marker icon back to default
      if (Object.keys(prevState.selectedMarker).length !== 0) {
        let m = prevState.mapMarkers[prevState.selectedMarker.key];
        m.icon = this.getMarkerIcon(m);
      }
      return { 
        showSidePanel: false,
        selectedMarker: {}
      };
    });
  }

  handleMarkerClick(marker, event) {
    this.setState((prevState) => {
      let markers = JSON.parse(JSON.stringify(prevState.mapMarkers));
      
      // Deselect previously selected icon      
      if (Object.keys(prevState.selectedMarker).length !== 0) {        
        let m = markers[prevState.selectedMarker.key];        
        m.icon = this.getMarkerIcon(m);
      }
      // Change the icon for the clicked marker
      markers[marker.key].icon = this.getMarkerIcon(markers[marker.key], true);

      return { 
        mapMarkers: markers,
        showSidePanel: true,
        selectedMarker: marker
      };
    })
  }

  handleAddToBasket() {
    let newBasket = Object.assign({}, this.state.basketList);
    newBasket[this.state.selectedMarker.key] = this.state.selectedMarker;
    let count = Object.keys(newBasket).length;
    
    // Save basket list to local browser storage
    localStorage.setItem('basketList', JSON.stringify(newBasket));

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
    let newBasket = Object.assign({}, this.state.basketList);
    delete newBasket[id];
    let count = Object.keys(newBasket).length;
    this.setState({
      basketList: newBasket,
      basketCount: count
    });
  }

  handleBasketItemTitleClick(id) {
    // Show info panel fort clicked basket item
    this.setState({
      selectedMarker: this.state.mapMarkers[id],
      showSidePanel: true
    });
  }

  handleSidePanelBtnClick(event) {
    this.setState({
      showSidePanel: false
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
          selectedMarker={this.state.selectedMarker} 
          onSidePanelBtnClick={this.handleSidePanelBtnClick.bind(this)} />
          
        <MapPanel
          mapData={this.state.mapData}
          mapMarkers={this.state.mapMarkers}
          onMapClick={this.handleMapClick.bind(this)}
          onMarkerClick={this.handleMarkerClick.bind(this)} />

          { this.state.showBasketPanel ? <BasketPanel
          basketList={this.state.basketList}
          onCloseBasketPanel={this.closeBasketPanel.bind(this)}
          onRemoveBasketElement={this.handleRemoveBasketElementBtnClick.bind(this)} 
          onBasketItemTitleClick={this.handleBasketItemTitleClick.bind(this)} /> : "" }

        <MainMenu />

        <BasketButton
          onBasketBtnClick={this.handleBasketBtnClick.bind(this)}
          basketCount={this.state.basketCount}
        />
      </div>
    );
  }
}

export default App;
