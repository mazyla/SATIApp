import React, {Component} from 'react';
import { View, Text, Image, Picker, Switch, Button, StyleSheet,
TouchableOpacity } from 'react-native';
import styles from '../styles/styles.js';
import CheckBox from 'react-native-checkbox-heaven';
import PropTypes from 'prop-types';

export default class CheckInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastcheckin: new Date(),
      statusMessage: "Happy",
      shareLocation: true,
      location: '',
    }

    checkin = (now) => {
      this.setState({ lastcheckin: now });
      setLoc();
    };

    setLoc = () => {
      if (this.state.shareLocation === true) {
        if (!("geolocation" in navigator)) {
          alert("Geolocation not supported");
          var locerr = "Geolocation not supported";
          this.setState({ location: locerr });
          return;
        }
        var geo = navigator.geolocation;
        geo.getCurrentPosition((p) => {
          console.log("Timestamp:" + p.timestamp);
          var loc = ("Lat:" + p.coords.latitude + " Lon:" + p.coords.longitude);
          this.setState({ location: loc });
        }, (e) => {console.log("ERROR(" + e.code + "):" + e.message)}, {timeout: 5000});
      } else {
        this.setState({ location: '' });
      }
    };

  }

  formatDate = (date) => {
    return date.toLocaleString();
  }

  _onPress() {
    var now = new Date();
    checkin(now);
  }

  _onChange = (checkbox) => {
    this.setState({ shareLocation: checkbox });
  }

  render() {
    return (
      <View style={styles.checkInContainer}>
        <Text style={styles.feelingText}> How I feel today? </Text>

        <Picker
          style={{width:300}}
          selectedValue={this.state.statusMessage}
          onValueChange={(itemValue, itemIndex) => this.setState({statusMessage: itemValue})}>
          <Picker.Item label="🙂 Happy" value="happy" />
          <Picker.Item label="🌷 Hopeful" value="hopeful" />
          <Picker.Item label="😍 Loved" value="loved" />
          <Picker.Item label="😀 Thankful" value="thankful" />
          <Picker.Item label="😁 Awesome" value="awesome" />
          <Picker.Item label="😌 Relaxed" value="relaxed" />
          <Picker.Item label="😢 Sad" value="sad" />
          <Picker.Item label="😵 Confused" value="confused" />
          <Picker.Item label="😊 Good" value="good" />
          <Picker.Item label="😟 Concerned" value="concerned" />
          <Picker.Item label="😴 Tired" value="tired" />
          <Picker.Item label="🆘 Need Help" value="help" />
          <Picker.Item label="😷 Sick" value="sick" />
          <Picker.Item label="🤕 Hurt" value="hurt" />
        </Picker>

        <View style={styles.shareLocationSwitchContainer}>
          <Text style= {styles.shareLocationText}> Share Location </Text>
          <CheckBox style={styles.checkbox}
            iconSize={40}
            checked={this.state.shareLocation}
            checkedColor='#ffffff'
            uncheckedColor='#ffffff'
            onChange={this._onChange}
          />
        </View>

        <TouchableOpacity style={styles.shareLocationCheckInContainer}
          onPress={this._onPress}>
          <Text style= {styles.checkInText}> Check In </Text>
        </TouchableOpacity>

          <Text style={{padding:20}}>{ this.formatDate(this.state.lastcheckin) }</Text>
          <Text style={{padding:20}}>{this.state.location}</Text>

      </View>
    );
  }
}
