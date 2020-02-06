import React, { Component } from 'react';
import '../css/App.css';
import mapStyle from './MapStyle.json'
import clusterStyle from './clusterStyles.json'
import googleMapApiKey from './GoogleApiKey'

import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const googleMapUrl = "https://maps.googleapis.com/maps/api/js";
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
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
    defaultZoom={3}
    defaultCenter={{ lat: 40, lng: 0 }}
    defaultOptions={{
      styles: mapStyle,
      streetViewControl: false,
      mapTypeControl: false,
      zoomControl: false,
      fullscreenControl: false
    }}
    onClick={props.onMapClick.bind(this)} 
    >
    {/*Cluster to implement*/}
    {/*<MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
      defaultStyles={clusterStyle}
    >*/}
    { Object.keys(props.markers).map(key => {
        let m = props.markers[key];
        return <Marker 
          position={ {lat: m.lat, lng: m.lng} }
          onClick={props.onMarkerClick.bind(this, m)}
          icon={m.icon}
          key={m.key} />
      }) }
    {/*</MarkerClusterer>*/}
    
  </GoogleMap>
)


/*
  We use React map wrapper. See the docs here:
  https://tomchentw.github.io/react-google-maps/
 */
class MapPanel extends Component {

  handleMapClick(event) {
    if (this.props.onMapClick) {
      this.props.onMapClick(event);
    }
  }

  handleMarkerClick(marker, event) {
    if (this.props.onMarkerClick) {
      this.props.onMarkerClick(marker, event);
    }
  }

  render() {
    return (
      <div className="mapContainer">
        <MyMapComponent
          onMapClick={this.handleMapClick.bind(this)}
          onMarkerClick={this.handleMarkerClick.bind(this)}
          markers={this.props.mapMarkers}
          isMarkerShown />
      </div>
    );
  }
}

export default MapPanel;
