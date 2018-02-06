import React, {Component} from 'react';
import { View, Text, Image, Picker, Switch, Button, TouchableOpacity } from 'react-native';
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
          //console.log("Timestamp:" + p.timestamp);
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

  _onPress = () => {
    var now = new Date();
    checkin(now);
  }

  _onChange = (checkbox) => {
    this.setState({ shareLocation: checkbox });
  }

  render() {
    return (
      <View style={styles.checkInContainer}>

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

        <View style={styles.checkInUpdateButtonContainer}>
          <TouchableOpacity
          activeOpacity={1}
          onPress={this._onPress}>
            <View style={styles.checkInUpdateButton}>
              <View style={styles.checkInUpdateButtonTextContainer}>
                <Text style={styles.checkInUpdateButtonText}>Safety Check</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.shareLocationSwitchContainer}>
          <Text style= {styles.shareLocationText}> Share Location </Text>
          <CheckBox
            style={styles.checkbox}
            iconSize={40}
            checked={this.state.shareLocation}
            checkedColor='#ffffff'
            uncheckedColor='#ffffff'
            onChange={this._onChange}
          />
        </View>

        <View style={styles.checkInPreviousLabelContainer}>
          <Text style={styles.checkInPreviousLabel}>Previous Check In</Text>
        </View>

        <View style={styles.checkInPreviousDateBoxContainer}>
          <View style={styles.checkInPreviousDateBox}>
            <View style={styles.checkInPreviousDateTextContainer}>
              <Text style={styles.checkInPreviousDateText}>Last Check In Goes Here</Text>
            </View>
          </View>
        </View>

        <View style={styles.checkInSeeAllContainer}>
          <TouchableOpacity
          activeOpacity={1}
          onPress={() => { alert(`You've clicked SEE ALL'`); }}>
            <View style={styles.checkInSeeAll}>
              <View style={styles.checkInSeeAllTextContainer}>
                <Text style={styles.checkInSeeAllText}>See All ></Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={{padding:20}}>{ this.formatDate(this.state.lastcheckin) }</Text>
        <Text style={{padding:20}}>{this.state.location}</Text>

      </View>
    );
  }
}
