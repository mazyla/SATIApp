import firebase from 'firebase';
import React, {Component} from 'react';
import { View, Text, Image, Switch, Button, TouchableOpacity, StatusBar, Alert } from 'react-native';
import styles from '../styles/styles.js';
import { CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';
import { fb } from '../../App'
import { Picker } from 'react-native-picker-dropdown'




export default class CheckInView extends Component {
  constructor(props) {
    super(props);

    this.checkInRef = fb.database().ref().child('users_checkIn');

    this.state = {
      lastcheckin: new Date(),
      statusMessage: "None",
      shareLocation: true,
      location: {
        lat: null,
        long: null,
      },
      totalCheckIns: this.setTotalCheckIns(),
    }
  }

  setTotalCheckIns = () => {
    var user = fb.auth().currentUser.email;
    var count = 0;
    var userCheckIn = this.checkInRef.orderByChild("email").equalTo(user);
    userCheckIn.on("value", function(snapshot) {
      var snapVal = snapshot.val();
      if (snapVal != undefined && snapVal != null) {
        count = Object.keys(snapVal).length;
        this.setState({totalCheckIns: count});
      } else {
        this.setState({totalCheckIns: 0});
      }
    }, this);
}

  checkIn = () => {
    this.setState({ lastcheckin: new Date() });
    this.setLocation();
    Alert.alert("checked in");
  };

  setStatus = (itemValue, itemIndex) => {
    this.setState({statusMessage: itemValue});
  };

  setLocation = () => { // *** TODO: NEEDS FIXIN' ***
    if (this.state.shareLocation === true) {
      navigator.geolocation.getCurrentPosition((position) => {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        this.setState({
          location: {
            lat: latitude,
            long: longitude
          }
        });
        this.storeInFirebase();
      }, (e) => {console.log("ERROR(" + e.code + "):" + e.message)});

    } else {
      this.setState({ location: '' });
      this.storeInFirebase();
    }
  };

  storeInFirebase = () => {
    var loc = this.state.shareLocation ? this.state.location : '';
    this.checkInRef.push({
      name: fb.auth().currentUser.displayName,
      time: this.formatDate(this.state.lastcheckin),
      location: this.state.location,
      status: this.state.statusMessage,
      email: fb.auth().currentUser.email,
    });
  };

  formatDate = (date) => {
    return date.toLocaleString();
  }

  render() {
    return (
      <View style={styles.checkInContainer}>

        <View style={styles.topBarContainer}>
          <StatusBar hidden={false} />
          <View style={styles.topBarTextContainer}>
            <Text style={styles.topBarText}>Update Status</Text>
          </View>
        </View>

        <View style={{height: '100%', justifyContent: 'center'}}>

        <View style={styles.checkInStatsContainer}>
          <View style={styles.checkInTotalCheckInsContainer}>
            <Text style={styles.checkInTotalCheckIns}>{this.state.totalCheckIns}</Text>
            <Text style={styles.checkInTotalCheckInsLabel}>Total check-ins</Text>
          </View>

          <View style={styles.checkInOtherStatsContainerContainer}>
            <View style={styles.checkInOtherStatsContainer}>
              <Text style={styles.checkInOtherStats}>15</Text>
              <Text style={styles.checkInOtherStatsLabel}>Consecutive days</Text>
            </View>
            <View style={styles.checkInOtherStatsContainer}>
              <Text style={styles.checkInOtherStats}>🙂</Text>
              <Text style={styles.checkInOtherStatsLabel}>Average emoji</Text>
            </View>
          </View>
        </View>

        <View style={styles.checkInUpdateContainer}>

          <View style={styles.checkInStatusPickerContainer}>
            <Picker
              style={styles.checkInStatusPicker}
              selectedValue={this.state.statusMessage}
              onValueChange={this.setStatus}>
              <Picker.Item label="None" value="None" />
              <Picker.Item label="🙂 Happy" value="🙂 Happy" />
              <Picker.Item label="🌷 Hopeful" value="🌷 Hopeful" />
              <Picker.Item label="😍 Loved" value="😍 Loved" />
              <Picker.Item label="😀 Thankful" value="😀 Thankful" />
              <Picker.Item label="😁 Awesome" value="😁 Awesome" />
              <Picker.Item label="😌 Relaxed" value="😌 Relaxed" />
              <Picker.Item label="😢 Sad" value="😢 Sad" />
              <Picker.Item label="😵 Confused" value="😵 Confused" />
              <Picker.Item label="😊 Good" value="😊 Good" />
              <Picker.Item label="😟 Concerned" value="😟 Concerned" />
              <Picker.Item label="😴 Tired" value="😴 Tired" />
              <Picker.Item label="🆘 Need Help" value="🆘 Need Help" />
              <Picker.Item label="😷 Sick" value="😷 Sick" />
              <Picker.Item label="🤕 Hurt" value="🤕 Hurt" />
            </Picker>
          </View>

          <View style={styles.checkInShareLocationContainer}>
            <CheckBox
              style={styles.checkInShareLocationCheckBox}
              checked={this.state.shareLocation}
              onPress={() => this.setState({ shareLocation: !this.state.shareLocation })}
              title='Share Location'
            />
          </View>

          <View style={styles.checkInUpdateButtonContainer}>
            <TouchableOpacity
            style={styles.checkInUpdateButton}
            activeOpacity={1}
            onPress={this.checkIn}>
              <View style={styles.checkInUpdateButtonTextContainer}>
                <Text style={styles.checkInUpdateButtonText}>Safety Check</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>

        </View>

      </View>
    );
  }
}
