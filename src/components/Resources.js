import React, {Component} from 'react';
import { View, Image } from 'react-native';
import styles from '../styles/styles.js';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default class ResourcesView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: null,
      longitude: null,
      latitude: null
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: position.region,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    return (
      <MapView style={styles.map}
        provider={ PROVIDER_GOOGLE }
        region={this.state.region}
        showsUserLocation={true}
        followUserLocation={true}
        />
    );
  }
}
