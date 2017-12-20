import React, { Component } from 'react';
import '../css/App.css';
import mapStyle from './MapStyle.json'
import googleMapApiKey from './GoogleApiKey'

import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

class MapPanel extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    // If shouldComponentUpdate returns false, 
    // then render() will be completely skipped until the next state change.
    // In addition, componentWillUpdate and componentDidUpdate will not be called. 
    return false;
  }
  render() {
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
          streetViewControl: false
        }}>
        {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
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
