import TouchableOpacity from 'TouchableOpacity';
import * as firebase from 'firebase';
import React, {Component} from 'react';
import { View, Image, Dimensions, Text} from 'react-native';
import styles from '../styles/styles.js';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import openMap from 'react-native-open-maps';
import { fb } from '../../App'


const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const ASPECT_RATIO = width/height;

// initial constant Bangkok location
const LATITUDE = 13.73617;
const LONGITUDE = 100.523186;

const LATITUDE_DELTA = 0.12;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export default class ResourcesView extends React.Component {
  constructor(props) {
    super(props);

    this.map = null;

     this.resourcesRef = fb.database().ref().child('resources');

    this.state = {
      region: {
        longitude: LONGITUDE,
        latitude: LATITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      markers: [
      ],

    };
  }

  listenForItems(resourcesRef) {

    resourcesRef.on('value', (snap) => {

      // get children as an array
      var resources = [];
      snap.forEach((child) => {
        resources.push({
          key: child.key,
          title: child.key,
          coordinate: {
            latitude: child.val().coordinate.latitude,
            longitude: child.val().coordinate.longitude,
        },
          type: child.val().type,
        });
      });

      this.setState({
        markers: resources,
      });

    });
  }

  _goTo(title) {
    var lat;
    var long;
    switch(title) {
      case 'The Hub':
        lat = 13.740331;
        long = 100.514245;
        break;
      case 'Surat Clinic':
        lat = 13.759573;
        long = 100.497486;
        break;
      case 'คลินิก สวท เวชกรรม ดินแดง':
        lat = 13.760883;
        long = 100.555128;
        break;
      default:
        lat = LATITUDE;
        long = LONGITUDE;
        break;
    }
      openMap({ latitude: lat, longitude: long, provider: PROVIDER_GOOGLE, zoom: 18 });
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
    this.listenForItems(this.resourcesRef);

  }

  render() {
    return (
      <View>
      <MapView
        ref={ref => { this.map = ref; }}
        style={styles.map}
        provider={ PROVIDER_GOOGLE }
        region={this.state.region}
        showsUserLocation={true}
        followUserLocation={true}
        showsCompass={true}  >
        {this.state.markers.map(marker => (
           <Marker
             key = {marker.key}
             identifier={marker.key}
             coordinate={marker.coordinate}
             pinColor={marker.color}
             onPress={this.showCallout}
           >
           <Callout tooltip={false}
            onPress={() => {this._goTo(marker.title)}}>
            <Text>{marker.title}</Text>
            </Callout>
           </Marker>

         ))}
       </MapView>
       </View>
);

  }
}
