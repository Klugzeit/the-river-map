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
      showBasketPanel: false,
      currentMarkerInfo: {},
      basketList: {},
      basketCount: 0
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
      showBasketPanel: false,
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

  handleAddToBasket() {
    var newBasket = Object.assign({}, this.state.basketList);
    newBasket[this.state.currentMarkerInfo.index] = this.state.currentMarkerInfo;
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
          currentMarkerInfo={this.state.currentMarkerInfo} />
        <MapPanel
          mapData={this.state.mapData}
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
