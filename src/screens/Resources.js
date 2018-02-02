import React, {Component} from 'react';
import { View, Image, Dimensions} from 'react-native';
import styles from '../styles/styles.js';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';


const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const ASPECT_RATIO = width/height;

// initial constant Bangkok location
const LATITUDE = 13.73617;
const LONGITUDE = 100.523186;

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



export default class ResourcesView extends React.Component {
  constructor(props) {
    super(props);

    this.mapRef = null;

    this.state = {
      region: {
        longitude: LONGITUDE,
        latitude: LATITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      marker: {
        coordinate: {
          latitude: 13.740331,
          longitude: 100.514245,
        },
        title: "The Hub",
      }

    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          },

        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

  }

  render() {
    return (
      <MapView
        style={styles.map}
        provider={ PROVIDER_GOOGLE }
        region={this.state.region}
        showsUserLocation={true}
        followUserLocation={true}
        showsCompass={true}
        showsBuildings={true} >


          <Marker
            coordinate={this.state.marker.coordinate}
            title={this.state.marker.title}
          />
        </MapView>
    );
  }
}
