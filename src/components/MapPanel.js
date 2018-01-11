import React, { Component } from 'react';
import '../css/App.css';
import mapStyle from './MapStyle.json'
import googleMapApiKey from './GoogleApiKey'

import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

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
    }}
    onClick={props.onMapClick.bind(this)} >
    {props.markers}
  </GoogleMap>
)


/*
  We use React map wrapper. See the docs here:
  https://tomchentw.github.io/react-google-maps/
 */
class MapPanel extends Component {

  constructor (props) {
    super(props);

    let icon = {
      path: 'M0,50 A50,50,0 1 1 100,50 A50,50,0 1 1 0,50 Z',
      fillColor: '#ff8a65',
      fillOpacity: 0.9,
      scale: 0.18,
      strokeColor: '#ff8a65'
    }

    this.state = {
      markers: []
    }

    let features = this.props.mapData.features;

    for (let i=0; i < features.length; i++) {
      let geo = features[i].geometry
      let markerInfo = {
        index: i,
        title: features[i].properties.title,
        info: features[i].properties.information,
        image: features[i].properties.image
      }
      this.state.markers.push(<Marker
        position={ {lat: geo.coordinates[0], lng: geo.coordinates[1]} }
        onClick={event => this.handleMarkerClick(event, markerInfo)}
        icon={icon}
        key={i} />
      );
    }
  }

  handleMapClick(event) {
    if (this.props.onMapClick) {
      this.props.onMapClick(event);
    }
  }

  handleMarkerClick(event, markerInfo) {
    if (this.props.onMarkerClick) {
      this.props.onMarkerClick(markerInfo);
    }

    let marker = this.state.markers[markerInfo.index];

    console.log(marker);

    let icon = {
      path: 'M0,50 A50,50,0 1 1 100,50 A50,50,0 1 1 0,50 Z',
      fillColor: '#ff8a65',
      fillOpacity: 0.2,
      scale: 0.18,
      strokeColor: '#ff8a65'
    }

    let newMarker = <Marker
      position={ {lat: marker.props.position.lat, lng: marker.props.position.lng} }
      onClick={event => this.handleMarkerClick(event, markerInfo)}
      icon={icon}
      key={marker.key} />

    this.setState((prevState) => {
      let newMarkers = Object.assign([], prevState.markers, {[marker.key]: newMarker});
      return { markers: newMarkers }
    })

  }

  render() {
    return (
      <div className="mapContainer">
        <MyMapComponent
          onMapClick={this.handleMapClick.bind(this)}
          markers={this.state.markers}
          isMarkerShown />
      </div>
    );
  }
}

export default MapPanel;
