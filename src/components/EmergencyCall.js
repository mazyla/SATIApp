import React, {Component} from 'react';
import { View, Text, Image, StatusBar,
  TouchableNativeFeedback, TouchableHighlight } from 'react-native';
import styles from '../styles/styles.js';
// Phone Call and SMS messaging (Can also open web addresses and email)
import Communications from 'react-native-communications';

export default class EmergencyCallView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
    }
  }
/*
  componentDidMount() {
    this.geoCheck();
  }

  geoCheck = () => {
    if("geolocation" in navigator) {
      console.log("Geolocation supported");
      this.getloc();
    } else {
      console.log("Geolocation not supported");
      return "Geolocation not supported";
    }
  }

  getloc = () => {
    geo = navigator.geolocation;
    geo.getCurrentPosition((p) => {
      console.log("Timestamp:" + p.timestamp);
      console.log("Lat:" + p.coords.latitude + " Lon:" + p.coords.longitude);
      return ("Lat:" + p.coords.latitude + " Lon:" + p.coords.longitude);
    }, (e) => {console.log("ERROR(" + e.code + "):" + e.message)}, {timeout: 5000});
  }
*/
  _onPress = () => {
    this.setState({location: Math.random() % 5});
  }

  render() {
    return (
      <View>
      
        <View style={{justifyContent: 'center', alignItems: 'center'}}>

          <TouchableHighlight
            onPress={() => {Communications.phonecall('0803874355', false)}}>
            <View style={styles.btnimagecontainer}>
              <Image
                source = {require('../../images/call.jpg')}
                style = {styles.btnimage}
              />
              <Text>Call The Hub</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => {Communications.text('0803874355', null)}}>
            <View style={styles.btnimagecontainer}>
              <Image
                source = {require('../../images/message.jpg')}
                style = {styles.btnimage}
              />
              <Text>Text The Hub</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={this._onPress}>
            <View style={styles.btnimagecontainer}>
              <Image
                source = {require('../../images/location.jpg')}
                style = {styles.btnimage}
              />
              <Text>Share Location to The Hub</Text>
            </View>
          </TouchableHighlight>
          <Text>{this.state.location}</Text>

        </View>
      </View>
    );
  }
}
