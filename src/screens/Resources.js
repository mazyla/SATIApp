import TouchableOpacity from 'TouchableOpacity';
import * as firebase from 'firebase';
import React, {Component} from 'react';
import { View, Image, Dimensions, Text, StatusBar } from 'react-native';
import styles from '../styles/styles.js';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import openMap from 'react-native-open-maps';
import { fb } from '../../App'


const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const ASPECT_RATIO = width / height;

// initial constant Bangkok location
const LATITUDE = 13.73617;
const LONGITUDE = 100.523186;

const LATITUDE_DELTA = 0.12;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

var mark = (markertype) => {
  var img;
  switch(markertype) {
    case 'hub': img = require('../../react-native/img/hub.png'); break;
    case 'clinic': img = require('../../react-native/img/clinic.png'); break;
    case 'food': img = require('../../react-native/img/food.png'); break;
    case 'shelter': img = require('../../react-native/img/shelter.png'); break;
    default: img = require('../../react-native/img/clinic.png'); break;
  }
  return img;
};


export default class ResourcesView extends React.Component {
  constructor(props) {
    super(props);
    this.resourcesRef = fb.database().ref().child('resources');
    this.map = null;
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [],
    };
  }

  listenForItems(resourcesRef) {
    resourcesRef.on('value', (snap) => {
      // get children as an array
      var resources = [];
      snap.forEach((child) => {
        resources.push({
          key: child.val().name,
          title: child.val().name,
          coordinate: {
            latitude: child.val().coordinate.latitude,
            longitude: child.val().coordinate.longitude,
          },
          type: child.val().type,
        });
      });

      this.setState({ markers: resources });

    });
  }

  _goTo(title, coordinate) {
    var lat = coordinate.latitude;
    var long = coordinate.longitude;
    openMap({ latitude: lat, longitude: long, provider: PROVIDER_GOOGLE, zoom: 18 });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        region: {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        },
      });
    }, (error) => this.setState({ error: error.message }), { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 });
    this.listenForItems(this.resourcesRef);
  }

  render() {
    return (
      <View style={styles.resourcesContainer}>

        <View style={styles.topBarContainer}>
          <StatusBar hidden={false} />
          <View style={styles.topBarTextContainer}>
            <Text style={styles.topBarText}>Resource Finder</Text>
          </View>
        </View>

        <MapView
          ref={ref => { this.map = ref; }}
          style={styles.resourcesMap}
          provider={PROVIDER_GOOGLE}
          region={this.state.region}
          showsUserLocation={true}
          followUserLocation={true}
          showsCompass={true}>
          {this.state.markers.map(marker => (
             <Marker
               key={marker.key}
               identifier={marker.key}
               coordinate={marker.coordinate}
               pinColor={marker.color}
               onPress={this.showCallout}
               image={mark(marker.type)}
             >
             <Callout tooltip={false}
              onPress={() => {this._goTo(marker.title, marker.coordinate)}}>
                <Text>{marker.title}</Text>
              </Callout>
             </Marker>
           ))}
        </MapView>

      </View>
   );
  }
}
