import React, { Component } from 'react';
import '../css/App.css';
import mapStyle from './MapStyle.json'
import googleMapApiKey from './GoogleApiKey'
import data from './db-final'

import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

class MapPanel extends Component {
  
  shouldComponentUpdate (nextProps, nextState) {
    // If shouldComponentUpdate returns false, 
    // then render() will be completely skipped until the next state change.
    // In addition, componentWillUpdate and componentDidUpdate will not be called. 
    return false;
  }

  handleMarkerClick(event, markerInfo) {
    if (this.props.onMarkerClick) {
      this.props.onMarkerClick(markerInfo);
    }
  }

  render() {
    
    let markers = [];
    let icon = {
      path: 'M0,50 A50,50,0 1 1 100,50 A50,50,0 1 1 0,50 Z',
      fillColor: '#ff8a65',
      fillOpacity: 0.9,
      scale: 0.18,
      strokeColor: '#ff8a65'
    }

    for (let i=0; i < data.features.length; i++) {
      let geo = data.features[i].geometry
      let markerInfo = {
        title: data.features[i].properties.title,
        info: data.features[i].properties.information
      }
      markers.push(<Marker 
        position={ {lat: geo.coordinates[0], lng: geo.coordinates[1]} }
        onClick={event => this.handleMarkerClick(event, markerInfo)}
        icon={icon}
        key={i} />
      );
    }

    const googleMapUrl = "https://maps.googleapis.com/maps/api/js";
    const MyMapComponent = compose(
      withProps({
        googleMapURL: `${googleMapUrl}?key=${googleMapApiKey}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withScriptjs,
      withGoogleMap
    )((props) =>
      <GoogleMap
        defaultZoom={2}
        defaultCenter={{ lat: 20, lng: 0 }}
        defaultOptions={{ 
          styles: mapStyle,
          streetViewControl: false,
          mapTypeControl: false,
          zoomControl: false,
          fullscreenControl: false
        }}>
        {markers}
      </GoogleMap>
    )
  
    return (
      <div className="mapContainer">
        <MyMapComponent isMarkerShown />
      </div>
    );
  }
}

export default MapPanel;
